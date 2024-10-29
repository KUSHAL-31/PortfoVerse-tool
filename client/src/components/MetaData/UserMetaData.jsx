import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import "./UserMetaData.scss";

const UserMetaData = () => {
  const [roles, setRoles] = useState([]);
  const [socials, setSocials] = useState([]);

  // Function to add a new component
  const addRole = () => {
    setRoles([...roles, { id: Date.now() }]);
  };

  // Function to remove a specific component
  const removeRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const addSocial = () => {
    setSocials([...socials, { id: Date.now() }]);
  };

  const removeSocial = (id) => {
    setSocials(socials.filter((social) => social.id !== id));
  };

  return (
    <div>
      <div className="metadata_section">
        <h2>Fill the following details and click on save to proceed</h2>
        <div className="metadata_left_section">
          <TextField
            id="outlined-basic"
            label="Enter the title"
            variant="outlined"
          />
          <TextField
            id="outlined-multiline-static"
            label="Enter the description"
            multiline
            rows={4}
            defaultValue=""
          />
          <div>
            {roles.map((role) => (
              <div key={role.id} style={{ marginBottom: "10px" }}>
                <TextField
                  id="outlined-basic"
                  label="Role"
                  variant="outlined"
                />
                <button
                  className="remove_button"
                  onClick={() => removeRole(role.id)}
                >
                  -
                </button>
              </div>
            ))}
            <Button variant="outlined" onClick={addRole}>
              Add +
            </Button>
          </div>
          <div>
            <Button variant="outlined" onClick={addSocial}>
              Add +
            </Button>
            {socials.map((social) => (
              <div key={social.id} style={{ marginBottom: "10px" }}>
                <InputLabel id="demo-simple-select-label">
                  Social type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={"LinkedIn"}
                  label="Age"
                  onChange={() => {}}
                >
                  <MenuItem value={"LinkedIn"}>LinkedIn</MenuItem>
                  <MenuItem value={"Github"}>Github</MenuItem>
                  <MenuItem value={"Instagram"}>Instagram</MenuItem>
                </Select>
                <TextField id="outlined-basic" label="URL" variant="outlined" />
                <button
                  className="remove_button"
                  onClick={() => removeSocial(social.id)}
                >
                  {" "}
                  -{" "}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="metadata_right_section"></div>
      </div>
    </div>
  );
};

export default UserMetaData;
