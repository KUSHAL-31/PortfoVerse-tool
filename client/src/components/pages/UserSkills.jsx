import React, { useState, useEffect } from "react";
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
  Grid,
} from "@mui/material";
import "./styles/UserSkills.scss";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";
import { Button1 } from "../../design/buttons/Buttons";

const UserSkills = () => {
  const dispatch = useDispatch();
  const { portfolioLoading, portfolioSkills } = useSelector(
    (state) => state.userPortfolio
  );

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (!portfolioLoading && portfolioSkills) {
      const loadedSkills = portfolioSkills.skillSection.map((skill) => ({
        id: skill.skillId,
        heading: skill.heading,
        list: skill.list.map((item) => ({
          id: item._id,
          name: item.name,
          rating: item.rating,
        })),
      }));
      setSkills(loadedSkills);
    }
  }, [portfolioLoading, portfolioSkills]);

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

  const removeSkillCard = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

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

  const addSkillToList = (index) => {
    const updatedSkills = [...skills];
    updatedSkills[index].list.push({
      id: Date.now() + Math.random(),
      name: "",
      rating: 100,
    });
    setSkills(updatedSkills);
  };

  const removeItemFromSkillList = (index, listItemIndex) => {
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
        <Grid container spacing={5}>
          {skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={skill.id}>
              <Card
                className="skill_card"
                variant="outlined"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    #{index + 1}
                  </Typography>

                  {/* Skill Title */}
                  <TextField
                    fullWidth
                    label="Enter the skill title"
                    variant="outlined"
                    value={skill.heading}
                    onChange={(e) =>
                      handleSkillChange(index, "heading", e.target.value)
                    }
                    style={{ marginBottom: "10px", flexGrow: 1, minWidth: 0 }}
                  />

                  {/* Add Skill Button */}
                  <Button
                    variant="outlined"
                    onClick={() => addSkillToList(index)}
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  >
                    Add Skill
                  </Button>

                  {/* List of Skills */}
                  {skill.list.map((listItem, listItemIndex) => (
                    <Box key={listItem.id} style={{ marginBottom: "10px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {/* Skill Name */}
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
                          style={{
                            marginBottom: "10px",
                            flexGrow: 1,
                            minWidth: 0, // Ensures the text field doesn't overflow
                          }}
                        />

                        {/* Remove Skill Button */}
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            removeItemFromSkillList(index, listItemIndex)
                          }
                          style={{
                            marginLeft: "10px",
                            height: "fit-content",
                            padding: "0 10px",
                            borderRadius: "50%",
                            minWidth: "auto",
                          }}
                        >
                          -
                        </Button>
                      </div>

                      {/* Range Slider */}
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
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
                      </div>
                    </Box>
                  ))}
                </CardContent>

                <CardActions>
                  {/* Remove Skill Card Button */}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeSkillCard(skill.id)}
                  >
                    Remove Skill Card
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Box mt={4} textAlign="center">
        <Button1
          text="Save and Proceed"
          onClick={() => dispatch({ type: INCREMENT_PAGE_COUNT })}
        />
      </Box>
    </div>
  );
};

export default UserSkills;
