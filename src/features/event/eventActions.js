import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../../app/common/util/helpers';

export const imageUpload = files => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userUid = getState().firebase.auth.uid;
    const filenames = [];

    const uploadedImgs = await Promise.all(
      files.map(async f => {
        filenames.push(f.name);
        return await firebase
          .storage()
          .ref(`${userUid}/eventImages/${f.name}`)
          .put(f);
      })
    );

    let urls = [];
    for (let i = 0; i < filenames.length; i++) {
      let url = await firebase
        .storage()
        .ref()
        .child(`${userUid}/eventImages/${filenames[i]}`)
        .getDownloadURL();
      urls.push(url);
    }
    console.log('URLS', urls);
    dispatch({ type: 'IMAGE_UPLOAD_SUCCESS', payload: urls });
  };
};

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const images = getState().images;
    const newEvent = createNewEvent(user, photoURL, event);
    newEvent.eventImages = images;
    console.log(newEvent);
    try {
      let createdEvent = await firestore.add('events', newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });

      toastr.success('Success!', 'Event has been created');
      return createdEvent;
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Success!', 'Event has been updated');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? 'Are you sure you want to cancel the event?'
    : 'This will reactivate the event, are you sure?';
  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};
