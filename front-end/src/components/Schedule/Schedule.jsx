import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import "./Schedule.css";
import { Button, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import meetingApi from "../../api/meetingApi";

export default function Schedule(state) {
  const backgroundYellow = useState("rgba(247, 172, 74, 0.288)");
  const colorYellow = useState("rgb(219, 145, 49)");
  const backgroundGreen = useState(" rgba(7, 245, 185, 0.233)");
  const colorGreen = useState("rgb(1, 177, 133)");
  const backgroundBlue = useState("rgba(0, 132, 255, 0.233)");
  const colorBlue = useState("rgb(0, 132, 255)");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [meetings, setMeetings] = React.useState([]);
  React.useEffect(() => {
    const fetchMeetings = async () => {
      const response = await meetingApi.getAll();
      setMeetings(response);
    };

    fetchMeetings();
  }, []);

  const checkFetchMeeting = state.isAddMeeting.isAddMeeting;
  if (checkFetchMeeting) {
    const fetchMeetings = async () => {
      const response = await meetingApi.getAll();
      setMeetings(response);
    };

    fetchMeetings();
  }

  const handleDelete = (id) => {
    const deleteMeeting = async () => {
      const response = await meetingApi.delete(id);
      setMeetings(response);
    };
    const fetchMeetings = async () => {
      const response = await meetingApi.getAll();
      setMeetings(response);
    };

    deleteMeeting();
    fetchMeetings();
    handleClose();
  };
  return (
    <div className="schedule">
      <div className="schedule-header">
        <h3>Meetings Schedule</h3>
        <Link to="/addMeeting">
          <Button className="schedule-button-add">
            <AddIcon />
          </Button>
        </Link>
      </div>
      {Array.isArray(meetings)
        ? meetings.map((item, index) => {
            return (
              <Card
                key={index}
                className="schedule-card"
                style={{
                  backgroundColor: item._id
                    ? parseInt(item._id.slice(-1)) % 3 === 0
                      ? backgroundBlue[0]
                      : item._id % 2 === 0
                      ? backgroundYellow[0]
                      : backgroundGreen[0]
                    : backgroundGreen[0],
                }}
              >
                <CardContent className="card-content">
                  <Typography className="card-typo">
                    <Typography
                      className="card-time"
                      variant="p"
                      color="text.secondary"
                    >
                      8h30 AM - 5h30 PM
                    </Typography>
                    <div>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        style={{
                          color: item._id
                            ? parseInt(item._id.slice(-1)) % 3 === 0
                              ? colorBlue[0]
                              : item._id % 2 === 0
                              ? colorYellow[0]
                              : colorGreen[0]
                            : colorGreen[0],
                        }}
                      >
                        <MoreVertIcon />
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <EditOutlinedIcon className="card-menu-icon" /> Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(item._id)}>
                          <DeleteOutlineIcon className="card-menu-icon" />{" "}
                          Delete
                        </MenuItem>
                      </Menu>
                    </div>
                  </Typography>
                  <Link to={item.link} target="_blank">
                    <Typography
                      className="card-typo card-title"
                      variant="h6"
                      component="div"
                      style={{
                        color: item._id
                          ? parseInt(item._id.slice(-1)) % 3 === 0
                            ? colorBlue[0]
                            : item._id % 2 === 0
                            ? colorYellow[0]
                            : colorGreen[0]
                          : colorGreen[0],
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                </CardContent>
                <CardActions className="card-image">
                  <img src="./assets/avatar_18.jpg" alt="" />
                  <img src="./assets/avatar_12.jpg" alt="" />
                  <img src="./assets/avatar_4.jpg" alt="" />
                  <img src="./assets/avatar_13.jpg" alt="" />
                  <img src="./assets/avatar_8.jpg" alt="" />
                </CardActions>
              </Card>
            );
          })
        : null}
    </div>
  );
}
