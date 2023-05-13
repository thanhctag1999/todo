import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomSelect from "../../common/CustomSelect/CustomSelect";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./Today.css";
import taskApi from "../../api/taskApi";
import { Button, Checkbox, FormControl, FormControlLabel } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const customTab = (name, count) => {
  return (
    <div className="custom-tab">
      <p>{name}</p>
      {count > 0 ? <span>{count}</span> : null}
    </div>
  );
};
export default function Today() {
  const [valueTab, setValueTab] = React.useState(0);
  const [tasks, setTask] = React.useState([]);

  React.useEffect(() => {
    const fetchTasks = async () => {
      const response = await taskApi.getAll();
      setTask(response);
    };

    fetchTasks();
  }, []);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleDelete = (id) => {
    const deleteTasks = async () => {
      await taskApi.delete(id);
      fetchTasks();
    };
    const fetchTasks = async () => {
      const response = await taskApi.getAll();
      setTask(response);
    };

    deleteTasks();
  };

  return (
    <header>
      <h1>Today Task</h1>
      <Box className="box" sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={valueTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="basic tabs example"
          >
            <Tab label={customTab("all", tasks.length)} {...a11yProps(0)} />
            <Tab
              label={customTab(
                "waiting",
                tasks.filter((element) => {
                  if (element.process === "Waiting") {
                    return true;
                  }
                  return false;
                }).length
              )}
              {...a11yProps(1)}
            />
            <Tab
              label={customTab(
                "inProcess",
                tasks.filter((element) => {
                  if (element.process === "In Process") {
                    return true;
                  }
                  return false;
                }).length
              )}
              {...a11yProps(2)}
            />
            <Tab
              label={customTab(
                "complete",
                tasks.filter((element) => {
                  if (element.process === "Complete") {
                    return true;
                  }
                  return false;
                }).length
              )}
              {...a11yProps(3)}
            />
            <Tab
              label={customTab(
                "inReview",
                tasks.filter((element) => {
                  if (element.process === "In Review") {
                    return true;
                  }
                  return false;
                }).length
              )}
              {...a11yProps(4)}
            />
            <Tab
              label={customTab(
                "approved",
                tasks.filter((element) => {
                  if (element.process === "Approved") {
                    return true;
                  }
                  return false;
                }).length
              )}
              {...a11yProps(5)}
            />
          </Tabs>
        </Box>
        <TabPanel value={valueTab} index={0}>
          {Array.isArray(tasks)
            ? tasks.map((item) => {
                return (
                  <div className="box-select" key={item._id}>
                    <FormControlLabel
                      className="box-form-lable"
                      control={<Checkbox />}
                      label={item.tittle}
                    />
                    <Button onClick={() => handleDelete(item._id)}>
                      <DeleteOutlineIcon className="box-icon" />
                    </Button>
                    <FormControl className="select-option" fullWidth>
                      {item.process === "Waiting" ? (
                        <CustomSelect
                          id={item._id}
                          value={item.process}
                          color="#a0a0a0"
                        />
                      ) : item.process === "In Process" ? (
                        <CustomSelect
                          id={item._id}
                          value={item.process}
                          color="#ffa42e"
                        />
                      ) : item.process === "Complete" ? (
                        <CustomSelect
                          id={item._id}
                          value={item.process}
                          color="#06dbad"
                        />
                      ) : item.process === "In Review" ? (
                        <CustomSelect
                          id={item._id}
                          value={item.process}
                          color="#fd2c61"
                        />
                      ) : (
                        <CustomSelect
                          id={item._id}
                          value={item.process}
                          color="#2c87fd"
                        />
                      )}
                    </FormControl>
                  </div>
                );
              })
            : null}
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          {Array.isArray(tasks)
            ? tasks.map((item) => {
                if (item.process === "Waiting") {
                  return (
                    <div className="box-select" key={item._id}>
                      <FormControlLabel
                        className="box-form-lable"
                        control={<Checkbox />}
                        label={item.tittle}
                      />
                      <Button onClick={() => handleDelete(item._id)}>
                        <DeleteOutlineIcon className="box-icon" />
                      </Button>
                      <FormControl className="select-option" fullWidth>
                        {item.process === "Waiting" ? (
                          <CustomSelect value={item.process} color="#a0a0a0" />
                        ) : item.process === "In Process" ? (
                          <CustomSelect value={item.process} color="#ffa42e" />
                        ) : item.process === "Complete" ? (
                          <CustomSelect value={item.process} color="#06dbad" />
                        ) : item.process === "In Review" ? (
                          <CustomSelect value={item.process} color="#fd2c61" />
                        ) : (
                          <CustomSelect value={item.process} color="#2c87fd" />
                        )}
                      </FormControl>
                    </div>
                  );
                } else {
                  return <div key={item._id}></div>;
                }
              })
            : null}
        </TabPanel>
        <TabPanel value={valueTab} index={2}>
          {Array.isArray(tasks)
            ? tasks.map((item) => {
                if (item.process === "In Process") {
                  return (
                    <div className="box-select" key={item._id}>
                      <FormControlLabel
                        className="box-form-lable"
                        control={<Checkbox />}
                        label={item.tittle}
                      />
                      <Button onClick={() => handleDelete(item._id)}>
                        <DeleteOutlineIcon className="box-icon" />
                      </Button>
                      <FormControl className="select-option" fullWidth>
                        {item.process === "Waiting" ? (
                          <CustomSelect value={item.process} color="#a0a0a0" />
                        ) : item.process === "In Process" ? (
                          <CustomSelect value={item.process} color="#ffa42e" />
                        ) : item.process === "Complete" ? (
                          <CustomSelect value={item.process} color="#06dbad" />
                        ) : item.process === "In Review" ? (
                          <CustomSelect value={item.process} color="#fd2c61" />
                        ) : (
                          <CustomSelect value={item.process} color="#2c87fd" />
                        )}
                      </FormControl>
                    </div>
                  );
                } else {
                  return <div key={item._id}></div>;
                }
              })
            : null}
        </TabPanel>
        <TabPanel value={valueTab} index={3}>
          {Array.isArray(tasks)
            ? tasks.map((item) => {
                if (item.process === "Complete") {
                  return (
                    <div className="box-select" key={item._id}>
                      <FormControlLabel
                        className="box-form-lable"
                        control={<Checkbox />}
                        label={item.tittle}
                      />
                      <Button onClick={() => handleDelete(item._id)}>
                        <DeleteOutlineIcon className="box-icon" />
                      </Button>
                      <FormControl className="select-option" fullWidth>
                        {item.process === "Waiting" ? (
                          <CustomSelect value={item.process} color="#a0a0a0" />
                        ) : item.process === "In Process" ? (
                          <CustomSelect value={item.process} color="#ffa42e" />
                        ) : item.process === "Complete" ? (
                          <CustomSelect value={item.process} color="#06dbad" />
                        ) : item.process === "In Review" ? (
                          <CustomSelect value={item.process} color="#fd2c61" />
                        ) : (
                          <CustomSelect value={item.process} color="#2c87fd" />
                        )}
                      </FormControl>
                    </div>
                  );
                } else {
                  return <div key={item._id}></div>;
                }
              })
            : null}
        </TabPanel>
        <TabPanel value={valueTab} index={4}>
          {Array.isArray(tasks)
            ? tasks.map((item) => {
                if (item.process === "In Review") {
                  return (
                    <div className="box-select" key={item._id}>
                      <FormControlLabel
                        className="box-form-lable"
                        control={<Checkbox />}
                        label={item.tittle}
                      />
                      <Button onClick={() => handleDelete(item._id)}>
                        <DeleteOutlineIcon className="box-icon" />
                      </Button>
                      <FormControl className="select-option" fullWidth>
                        {item.process === "Waiting" ? (
                          <CustomSelect value={item.process} color="#a0a0a0" />
                        ) : item.process === "In Process" ? (
                          <CustomSelect value={item.process} color="#ffa42e" />
                        ) : item.process === "Complete" ? (
                          <CustomSelect value={item.process} color="#06dbad" />
                        ) : item.process === "In Review" ? (
                          <CustomSelect value={item.process} color="#fd2c61" />
                        ) : (
                          <CustomSelect value={item.process} color="#2c87fd" />
                        )}
                      </FormControl>
                    </div>
                  );
                } else {
                  return <div key={item._id}></div>;
                }
              })
            : null}
        </TabPanel>
        <TabPanel value={valueTab} index={5}>
          {Array.isArray(tasks)
            ? tasks.map((item) => {
                if (item.process === "Approved") {
                  return (
                    <div className="box-select" key={item._id}>
                      <FormControlLabel
                        className="box-form-lable"
                        control={<Checkbox />}
                        label={item.tittle}
                      />
                      <Button onClick={() => handleDelete(item._id)}>
                        <DeleteOutlineIcon className="box-icon" />
                      </Button>
                      <FormControl className="select-option" fullWidth>
                        {item.process === "Waiting" ? (
                          <CustomSelect value={item.process} color="#a0a0a0" />
                        ) : item.process === "In Process" ? (
                          <CustomSelect value={item.process} color="#ffa42e" />
                        ) : item.process === "Complete" ? (
                          <CustomSelect value={item.process} color="#06dbad" />
                        ) : item.process === "In Review" ? (
                          <CustomSelect value={item.process} color="#fd2c61" />
                        ) : (
                          <CustomSelect value={item.process} color="#2c87fd" />
                        )}
                      </FormControl>
                    </div>
                  );
                } else {
                  return <div key={item._id}></div>;
                }
              })
            : null}
        </TabPanel>
      </Box>
    </header>
  );
}
