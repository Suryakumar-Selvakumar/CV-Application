import { useEffect, useState } from "react";
import { SkillsGroup } from "./SkillsGroup";
import "../styles/TechnicalSkills.css";

export function TechnicalSkills() {
  const storedSkills = JSON.parse(localStorage.getItem("skills"));
  const [skills, setSkills] = useState(storedSkills ? storedSkills : []);
  const [skillsGroup, setSkillsGroup] = useState({
    id: 0,
    skillsType: "",
    skillsList: "",
  });

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  function handleSubmit(limit) {
    if (skills.length >= 1) {
      // Hide the form
      document.querySelector(".technical-skills-form").style.cssText =
        "display: none;";

      // Display the Add Technical Skills button
      document.getElementById("add-technical-skills").style.cssText =
        "display: block";
    }

    if (skills.length === limit) {
      // Hide the Add Technical Skills button when limit is reached
      document.getElementById("add-technical-skills").style.cssText =
        "display: none;";
    }
  }

  function addTechnicalSkills() {
    document.querySelector(".technical-skills-form").style.cssText =
      "display: block;";
    document.getElementById("add-technical-skills").style.cssText =
      "display: none;";
  }

  function addSkillsGroup(limit) {
    if (
      skills.length < limit &&
      skillsGroup.skillsType !== "" &&
      skillsGroup.skillsList !== ""
    ) {
      setSkills([
        ...skills,
        {
          id: crypto.randomUUID(),
          skillsType: skillsGroup.skillsType,
          skillsList: skillsGroup.skillsList,
        },
      ]);
    }

    if (skillsGroup.skillsType === "" && skillsGroup.skillsList !== "") {
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: skillsGroup.skillsList,
      });
    } else if (skillsGroup.skillsType !== "" && skillsGroup.skillsList === "") {
      setSkillsGroup({
        id: 0,
        skillsType: skillsGroup.skillsType,
        skillsList: "",
      });
    } else {
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: "",
      });
    }
  }

  function editSkillsGroup(skillsGroupId) {
    skills.forEach((skill) => {
      if (skill.id === skillsGroupId) {
        setSkillsGroup({
          id: skill.id,
          skillsType: skill.skillsType,
          skillsList: skill.skillsList,
        });
      }
    });
    document.getElementById("update-skills-group").style.cssText =
      "display: inline;";
    document.getElementById("add-skills-group").style.cssText =
      "display: none;";
    document.getElementById("add-technical-skills").style.cssText =
      "display: none;";
    document.querySelector(".technical-skills-form").style.cssText =
      "display: block;";
  }

  function updateSkillsGroup() {
    if (skillsGroup.skillsType !== "" && skillsGroup.skillsList !== "") {
      const updatedSkills = skills.map((skill) => {
        if (skill.id === skillsGroup.id) {
          return {
            ...skill,
            skillsType: skillsGroup.skillsType,
            skillsList: skillsGroup.skillsList,
          };
        } else {
          return skill;
        }
      });
      setSkills(updatedSkills);
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: "",
      });
      document.getElementById("update-skills-group").style.cssText =
        "display: none;";
      document.getElementById("add-skills-group").style.cssText =
        "display: inline;";
      document.getElementById("update-skills-group").style.cssText =
        "display: none;";
      document.getElementById("add-technical-skills").style.cssText =
        "display: inline;";
    }
  }

  function deleteSkillsGroup(skillsGroupId) {
    setSkills(skills.filter((skill) => skill.id !== skillsGroupId));

    if (skillsGroup.id === skillsGroupId || skills.length === 1) {
      document.getElementById("update-skills-group").style.cssText =
        "display: none;";
      document.getElementById("add-skills-group").style.cssText =
        "display: inline;";
      setSkillsGroup({
        id: 0,
        skillsType: "",
        skillsList: "",
      });
    }
  }

  return (
    <>
      <button
        type="button"
        id="add-technical-skills"
        onClick={() => addTechnicalSkills(5)}
      >
        Add Technical Skills
      </button>
      <form className="technical-skills-form" onSubmit={() => handleSubmit(5)}>
        <label htmlFor="skills-type">Enter skills type: </label>
        <input
          type="text"
          id="skills-type"
          value={skillsGroup.skillsType}
          onChange={(e) =>
            setSkillsGroup({ ...skillsGroup, skillsType: e.target.value })
          }
        />
        <label htmlFor="skills-list">Enter list of skills: </label>
        <input
          type="text"
          id="skills-list"
          value={skillsGroup.skillsList}
          onChange={(e) =>
            setSkillsGroup({ ...skillsGroup, skillsList: e.target.value })
          }
        />
        <button
          type="button"
          onClick={() => addSkillsGroup(5)}
          id="add-skills-group"
        >
          Add Skills Group
        </button>
        <button
          type="button"
          onClick={() => updateSkillsGroup()}
          id="update-skills-group"
        >
          Update Skills Group
        </button>
        <button type="submit">Submit</button>
      </form>
      <div className="technical-skills-cards">
        {skills.map((skillsGroup) => (
          <SkillsGroup
            key={skillsGroup.id}
            skillsGroup={skillsGroup}
            editSkillsGroup={editSkillsGroup}
            deleteSkillsGroup={deleteSkillsGroup}
          />
        ))}
      </div>
    </>
  );
}
