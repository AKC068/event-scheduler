import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import "./EventCalendar.css";
import { Form, Button } from "react-bootstrap";
import Modal from "../Modal/Modal";

class EventCalendar extends Component {
  state = {
    weekendsVisible: true,
    currentEvents: [
      { title: "Event1", date: "2020-11-11", color: "purple" },
      { title: "Event2", date: "2020-10-11" },
      { title: "Event3", date: "2020-10-11" },
      { title: "Event4", date: "2020-10-11" },
      { title: "Event5", date: "2020-10-11" },
    ],
    toggle: false,
    dateclicked: "",
    name: "",
    toggle1: false,
    eventClicked: "",
    startTime: "",
    eventid: false,
  };

  weekendView = () => {
    this.setState({ weekendsVisible: !this.state.weekendsVisible });
  };

  handleDateClick = (info) => {
    this.setState({ toggle: !this.state.toggle, dateclicked: info.dateStr });
  };

  handleTitleOnChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  handleDateOnChange = (e) => {
    e.preventDefault();
    this.setState({ dateclicked: e.target.value });
  };

  handleStartOnChange = (e) => {
    e.preventDefault();
    this.setState({ startTime: e.target.value });
  };

  getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  handleSubmit = (e) => {
    const item = {};
    item.title = this.state.name;
    item.date = this.state.dateclicked;
    //if(this.state.startTime !== null){
    //item.start = this.state.startTime;
    //}
    item.color = this.getRandomColor();
    this.setState({
      currentEvents: this.state.currentEvents.concat(item),
      toggle: false,
    });
    e.preventDefault();
  };

  //var event1;

  handleEventClick = (info) => {
    this.setState({
      toggle1: !this.state.toggle1,
      eventClicked: info.event.id,
    });
    var del = window.confirm("Delete the event?");
    if(del === true){
      info.event.remove();
    }
  };

  delEvent = (e) => {};

  render() {
    return (
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          events={this.state.currentEvents}
          weekends={this.state.weekendsVisible}
          dayMaxEventRows={true}
          customButtons={{
            myCustomButton: {
              text: "Show/Hide Weekends",
              click: this.weekendView,
            },
          }}
          headerToolbar={{
            left: "prev,next myCustomButton",
            center: "title",
            right: "today dayGridDay,dayGridWeek,dayGridMonth",
          }}
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
            list: "List",
          }}
          displayEventTime={true}
          select={this.handleDateSelect}
          eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
        />
        <Modal
          show={this.state.toggle}
          datechosen={this.state.dateclicked}
          modalClosed={this.handleDateClick}
          className="add"
        >
          {/* <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Enter Event Title"
              value={this.state.name}
              onChange={this.handleOnChange}
            />
            <p>Date: {this.state.dateclicked}</p>
            <button type="submit">Submit</button>
          </form> */}

          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                value={this.state.name}
                onChange={this.handleTitleOnChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={this.state.dateclicked}
                onChange={this.handleDateOnChange}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="datetime-local" value={this.state.startTime} onChange={this.handleStartOnChange}/>
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal>
        {/* <Modal
          show={this.state.toggle1}
          modalClosed={this.handleEventClick}
          className="del"
        >
          <Form onSubmit={this.delEvent}>
            <Button type="submit">DELETE</Button>
          </Form>
          <br />
          <Button>CONTINUE</Button>
        </Modal> */}
      </div>
    );
  }
}

export default EventCalendar;
