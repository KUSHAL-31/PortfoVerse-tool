import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./UserMetaData.scss";
import { Button1 } from "../../design/buttons/Buttons";

const UserMetaData = () => {
  const { portfolioLoading, portfolioMetaData } = useSelector(
    (state) => state.userPortfolio
  );

  const [roles, setRoles] = useState([]);
  const [socials, setSocials] = useState([]);
  const socialMediaOptions = [
    "LinkedIn",
    "Github",
    "Twitter",
    "Instagram",
    "Leetcode",
  ];

  // Function to add a new component
  const addRole = () => {
    setRoles([...roles, { id: Date.now(), text: "" }]);
  };

  // Function to remove a specific component
  const removeRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handleRoleTextChange = (id, value) => {
    setRoles(
      roles.map((role) => (role.id === id ? { ...role, text: value } : role))
    );
  };

  const addSocial = () => {
    const selectedValues = socials.map((social) => social.selected);
    const firstAvailableOption = socialMediaOptions.find(
      (option) => !selectedValues.includes(option)
    );

    if (firstAvailableOption) {
      setSocials([
        ...socials,
        { id: Date.now(), selected: firstAvailableOption, url: "" },
      ]);
    }
  };

  const removeSocial = (id) => {
    // Remove the social item with the matching id
    setSocials(socials.filter((social) => social.id !== id));
  };

  const handleSelectChange = (id, selectedValue) => {
    setSocials(
      socials.map((social) =>
        social.id === id ? { ...social, selected: selectedValue } : social
      )
    );
  };

  const handleUrlChange = (id, url) => {
    setSocials(
      socials.map((social) => (social.id === id ? { ...social, url } : social))
    );
  };

  // // Get selected values to filter out from dropdown options
  // const selectedValues = socials.map((social) => social.selected);

  // Initialize roles when portfolioMetaData changes
  useEffect(() => {
    if (portfolioMetaData && portfolioMetaData.roles && !roles.length) {
      setRoles(
        portfolioMetaData.roles.map((role) => ({
          id: Date.now() + Math.random(),
          text: role,
        }))
      );
    }
  }, [portfolioMetaData]);

  if (portfolioLoading === undefined || portfolioLoading) {
    return <h1>Loading...</h1>;
  }
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
            <Button
              variant="outlined"
              onClick={addRole}
              disabled={roles.length >= 4}
            >
              Add +
            </Button>
            {roles.map((role) => (
              <div key={role.id} style={{ marginBottom: "10px" }}>
                <TextField
                  id="outlined-basic"
                  label="Role"
                  autoComplete="off"
                  variant="outlined"
                  value={role.text}
                  onChange={(e) =>
                    handleRoleTextChange(role.id, e.target.value.slice(0, 25))
                  }
                  // helperText={`${role.text.length}/25`} // Display character count
                  FormHelperTextProps={{
                    style: { textAlign: "right", marginTop: "5px" },
                  }}
                />
                <button
                  className="remove_button"
                  onClick={() => removeRole(role.id)}
                >
                  -
                </button>
              </div>
            ))}
          </div>
          <div>
            <Button
              variant="outlined"
              onClick={addSocial}
              disabled={socials.length >= socialMediaOptions.length}
            >
              Add +
            </Button>
            {socials.map((social) => (
              <div key={social.id} style={{ marginBottom: "10px" }}>
                <InputLabel id={`select-label-${social.id}`}>
                  Social type
                </InputLabel>
                <Select
                  labelId={`select-label-${social.id}`}
                  id={`select-${social.id}`}
                  value={social.selected}
                  onChange={(e) =>
                    handleSelectChange(social.id, e.target.value)
                  }
                >
                  {socialMediaOptions
                    .filter(
                      (option) =>
                        !socials.map((s) => s.selected).includes(option) ||
                        option === social.selected
                    )
                    .map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </Select>
                <TextField
                  id={`outlined-basic-${social.id}`}
                  label="URL"
                  variant="outlined"
                  style={{ marginLeft: "10px" }}
                  value={social.url}
                  onChange={(e) => handleUrlChange(social.id, e.target.value)}
                />
                <button
                  className="remove_button"
                  onClick={() => removeSocial(social.id)}
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="metadata_right_section"></div>
        <Button1 text={"Save and continue"} onClick={() => {}} />
      </div>
    </div>
  );
};

export default UserMetaData;
