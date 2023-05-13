import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./Sidebar.css";
function SideBar() {
  const [actived, setActived] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 1024);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sidebar">
      <Sidebar defaultCollapsed={isMobile} backgroundColor="#fff" icon="">
        <img src="./assets/logo.png" alt="logo" />
        <Menu>
          <SubMenu id="menu-tittle-primary" defaultOpen={true} label="Work">
            <MenuItem
              icon={<StarOutlineOutlinedIcon />}
              component={<Link to="/" />}
              active={actived === 0 ? true : false}
              onClick={() => {
                setActived(0);
              }}
            >
              Today
            </MenuItem>
            <MenuItem
              icon={<InboxOutlinedIcon />}
              component={<Link to="/upcoming" />}
              active={actived === 1 ? true : false}
              onClick={() => {
                setActived(1);
              }}
            >
              Upcoming
            </MenuItem>
            <MenuItem
              icon={<AutoAwesomeMotionOutlinedIcon />}
              component={<Link to="/anytime" />}
              active={actived === 2 ? true : false}
              onClick={() => {
                setActived(2);
              }}
            >
              AnyTime
            </MenuItem>
            <MenuItem
              icon={<ContentPasteOutlinedIcon />}
              component={<Link to="/sometime" />}
              active={actived === 3 ? true : false}
              onClick={() => {
                setActived(3);
              }}
            >
              SomeTime
            </MenuItem>
            <MenuItem
              icon={<DeleteOutlinedIcon />}
              component={<Link to="/trash" />}
              active={actived === 4 ? true : false}
              onClick={() => {
                setActived(4);
              }}
            >
              Trash
            </MenuItem>
          </SubMenu>
        </Menu>
        <Menu>
          <SubMenu
            id="menu-tittle-secondary"
            defaultOpen={true}
            label="Personal"
          >
            <MenuItem
              icon={<CloudOutlinedIcon />}
              component={<Link to="/vacation" />}
              active={actived === 5 ? true : false}
              onClick={() => {
                setActived(5);
              }}
            >
              Vacation Planing
            </MenuItem>
            <MenuItem
              icon={<FavoriteBorderOutlinedIcon />}
              component={<Link to="/festival" />}
              active={actived === 6 ? true : false}
              onClick={() => {
                setActived(6);
              }}
            >
              Festival
            </MenuItem>
          </SubMenu>
        </Menu>
        <Link to="/add">
          <Button className="sidebar-button-add">
            <AddIcon />
          </Button>
        </Link>
      </Sidebar>
    </div>
  );
}
export default SideBar;
