import React, { useState } from "react";
import RangeSlider from "../../utils/RangeSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import "./styles/UserSkills.scss";

const UserSkills = () => {
  const dispatch = useDispatch();
  const { portfolioLoading, portfolio, portfolioExpAndEdu } = useSelector(
    (state) => state.userPortfolio
  );
  const [skills, setSkills] = useState([]);

  // Add a new skill card
  const addSkillCard = () => {
    if (skills.length < 6) {
      setSkills([
        ...skills,
        {
          id: Date.now() + Math.random(),
          heading: "",
          list: [{ id: Date.now() + Math.random(), name: "", rating: 100 }],
        },
      ]);
    } else {
      alert("You can add a maximum of 6 skills");
    }
  };

  // Remove a skill card

  const removeSkillCard = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  // Handle changes for the skill title, skill names, and proficiency levels
  const handleSkillChange = (index, field, value, listItemIndex = null) => {
    const updatedSkills = [...skills];
    if (listItemIndex === null) {
      updatedSkills[index][field] = value;
    } else {
      updatedSkills[index].list[listItemIndex][
        field === "listItemName" ? "name" : "rating"
      ] = value;
    }
    setSkills(updatedSkills);
  };

  // Add a new sub-skill
  const addSkillToList = (index) => {
    const updatedSkills = [...skills];
    updatedSkills[index].list.push({
      id: Date.now() + Math.random(),
      name: "",
      rating: 100,
    });
    setSkills(updatedSkills);
  };

  // Remove a sub-skill
  const remmoveItemFromSkillList = (index, listItemIndex) => {
    const updatedSkills = [...skills];
    updatedSkills[index].list = updatedSkills[index].list.filter(
      (item) => item.id !== updatedSkills[index].list[listItemIndex].id
    );
    setSkills(updatedSkills);
  };

  return (
    <div className="skill_section">
      <Typography variant="h4" gutterBottom>
        Skills Section
      </Typography>
      <Button variant="outlined" onClick={addSkillCard}>
        Add New Skill
      </Button>
      <div className="skill_cards_section">
        {skills.map((skill, index) => (
          <Card
            className="skill_card"
            key={skill.id}
            variant="outlined"
            style={{ marginBottom: "20px", width: "100%" }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                #{index + 1}
              </Typography>
              <TextField
                fullWidth
                label="Enter the skill title"
                variant="outlined"
                value={skill.heading}
                onChange={(e) =>
                  handleSkillChange(index, "heading", e.target.value)
                }
                style={{ marginBottom: "10px" }}
              />
              <Button
                variant="outlined"
                onClick={() => addSkillToList(index)}
                style={{ marginTop: "10px" }}
              >
                Add Skill
              </Button>
              {skill.list.map((listItem, listItemIndex) => (
                <Box key={listItem.id} style={{ marginBottom: "10px" }}>
                  <div>
                    <TextField
                      label="Enter the skill name"
                      variant="outlined"
                      value={listItem.name}
                      onChange={(e) =>
                        handleSkillChange(
                          index,
                          "listItemName",
                          e.target.value,
                          listItemIndex
                        )
                      }
                      style={{ marginBottom: "10px" }}
                    />
                    <button
                      className="remove_button"
                      onClick={() =>
                        remmoveItemFromSkillList(index, listItemIndex)
                      }
                    >
                      -
                    </button>
                  </div>

                  <RangeSlider
                    selectedValue={listItem.rating}
                    onChange={(e, value) =>
                      handleSkillChange(
                        index,
                        "listItemLevel",
                        value,
                        listItemIndex
                      )
                    }
                  />
                </Box>
              ))}
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeSkillCard(skill.id)}
              >
                Remove Skill Card
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserSkills;
