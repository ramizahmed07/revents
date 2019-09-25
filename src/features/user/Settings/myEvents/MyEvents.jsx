import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import MyEventItems from './MyEventItems';

const MyEvents = props => {
  const { events, userUid } = props;
  return (
    <Fragment>
      {events &&
        events.map(event => {
          if (event.hostUid == userUid)
            return (
              <MyEventItems key={event.id} userUid={userUid} event={event} />
            );
        })}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    events: state.firestore.ordered.events,
    userUid: state.firebase.auth.uid
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'events' }])
)(MyEvents);
