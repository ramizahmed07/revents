import React from 'react';
import { Segment, Item, Label, Icon, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const MyEventListItems = ({ event }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${event.id}`}>
                {event.title}
              </Item.Header>
              <Item.Description>
                Hosted by{' '}
                <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>{' '}
              </Item.Description>
              {event.cancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon='right'
                  color='red'
                  content='This event has been cancelled'
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' />
          {format(event.date.toDate(), 'EEEE do LLL')} at{' '}
          {format(event.date.toDate(), 'h:mm a')} |
          <Icon name='marker' /> {event.venue}
        </span>
      </Segment>
      {/* <Segment secondary>
        <List horizontal>
          {event.attendees &&
            objectToArray(event.attendees).map(attendee => (
              <EventListAttendee key={attendee.id} attendee={attendee} />
            ))}
        </List>
      </Segment> */}
      <Segment clearing>
        <span>{event.description}</span>
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
};

export default MyEventListItems;
