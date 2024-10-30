import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserMetaData.scss";
import { Button1 } from "../../design/buttons/Buttons";
import { updateUserMetaData } from "../../redux/actions/userActions";
import CreatePortfolioSteps from "../PortfolioSteps/CreatePortfolioSteps";

const UserMetaData = () => {
  const { portfolioLoading, portfolioMetaData, portfolio } = useSelector(
    (state) => state.userPortfolio
  );

  const dispatch = useDispatch();

  const [roles, setRoles] = useState([]);
  const [socials, setSocials] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resume, setResume] = useState("");

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
    if (portfolioLoading === false && portfolioMetaData) {
      setTitle(portfolioMetaData.title);
      setDescription(portfolioMetaData.description);
      setResume(portfolioMetaData.resume);
      if (portfolioMetaData.roles && !roles.length) {
        setRoles(
          portfolioMetaData.roles.map((role) => ({
            id: Date.now() + Math.random(),
            text: role,
          }))
        );
      }
      if (portfolioMetaData.socials && !socials.length) {
        setSocials(
          portfolioMetaData.socials.map((social) => ({
            id: Date.now() + Math.random(), // To ensure unique IDs
            selected: social.name,
            url: social.url,
          }))
        );
      }
    }
  }, [portfolioMetaData, portfolioLoading]);

  const saveMetaData = async () => {
    const portfolioData = {
      portfolioId: portfolio._id,
      title,
      description,
      resume,
      roles: roles.map((role) => role.text),
      socials: socials.map((social) => ({
        name: social.selected,
        url: social.url,
      })),
    };
    const doesExist = portfolioMetaData !== null ? true : false;
    dispatch(updateUserMetaData(doesExist, portfolioData));
  };

  if (portfolioLoading === undefined || portfolioLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <CreatePortfolioSteps activeStep={0} />
      <h2 className="metadata_title">
        Fill the following details and click on save to proceed
      </h2>
      <div className="metadata_section">
        <div className="metadata_left_section">
          <TextField
            className="metadata_left_inputs"
            id="outlined-basic"
            label="Enter the title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className="metadata_left_inputs"
            id="outlined-multiline-static"
            label="Enter the description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            className="metadata_left_inputs"
            id="outlined-basic"
            label="Resume Link"
            variant="outlined"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>
        <div className="metadata_right_section">
          <div>
            <InputLabel id="demo-simple-select-label">
              Add your roles
            </InputLabel>
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
                  className="metadata_right_inputs"
                  id="outlined-basic"
                  label="Role"
                  autoComplete="off"
                  variant="outlined"
                  value={role.text}
                  onChange={(e) =>
                    handleRoleTextChange(role.id, e.target.value.slice(0, 25))
                  }
                  helperText={role?.text ? `${role.text.length}/25` : ""} // Display character count
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
            <InputLabel id="demo-simple-select-label">
              Add your social media URLs
            </InputLabel>
            <Button
              variant="outlined"
              onClick={addSocial}
              disabled={socials.length >= socialMediaOptions.length}
            >
              Add +
            </Button>
            {socials.map((social) => (
              <div key={social.id} style={{ marginBottom: "10px" }}>
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
      </div>
      <div className="section_save_button">
        <Button1 text={"Save and proceed"} onClick={() => saveMetaData()} />
      </div>
    </>
  );
};

export default UserMetaData;
