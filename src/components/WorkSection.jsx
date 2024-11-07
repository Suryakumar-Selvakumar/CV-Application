import { useEffect, useState, useRef, Fragment } from "react";
import { Work } from "./Work";
import { Role } from "./Role";
import "../styles/WorkSection.css";

export function WorkSection() {
  const storedExperiences = JSON.parse(localStorage.getItem("experiences"));
  const storedMainVisible = JSON.parse(
    localStorage.getItem("experiencesMainVisible")
  );
  const [experiences, setExperiences] = useState(
    storedExperiences ? storedExperiences : []
  );
  const [workDetails, setWorkDetails] = useState({
    id: 0,
    company: "",
    place: "",
    position: "",
    startWork: "",
    endWork: "",
    roles: [],
    stillWorking: false,
  });
  const [mainVisible, setMainVisible] = useState(
    storedMainVisible ? storedMainVisible : false
  );
  const [role, setRole] = useState({ id: 0, value: "" });
  const [workLimit, setWorkLimit] = useState(2);
  const [roleLimit, setRoleLimit] = useState(4);

  // DOM refs
  const limitErrorDiv = useRef(null);
  const addWorkBtn = useRef(null);
  const workForm = useRef(null);
  const updateWorkBtn = useRef(null);
  const addRoleBtn = useRef(null);
  const updateRoleBtn = useRef(null);
  const submitWorkBtn = useRef(null);
  const dropDownSvg = useRef(null);
  const roleCardsDiv = useRef(null);

  useEffect(() => {
    if (experiences)
      localStorage.setItem("experiences", JSON.stringify(experiences));

    localStorage.setItem("experiencesMainVisible", JSON.stringify(mainVisible));
  }, [experiences, mainVisible]);

  function addWork() {
    updateWorkBtn.current.style.cssText = "display: none;";
    workForm.current.reset();

    setWorkDetails({
      id: 0,
      company: "",
      place: "",
      position: "",
      startWork: "",
      endWork: "",
      roles: [],
      stillWorking: false,
    });

    if (experiences.length < workLimit) {
      addWorkBtn.current.style.cssText = "display: none;";
      workForm.current.style.cssText = "display: flex;";
      limitErrorDiv.current.style.cssText = "display: none;";
    } else {
      limitErrorDiv.current.style.cssText = "display: flex;";
    }

    if (workDetails.roles.length === roleLimit) {
      addRoleBtn.current.disabled = true;
    } else {
      addRoleBtn.current.disabled = false;
    }
  }

  function editWork(workId) {
    experiences.forEach((work) => {
      if (work.id === workId) {
        if (work.roles.length === roleLimit) {
          addRoleBtn.current.disabled = true;
        } else {
          addRoleBtn.current.disabled = false;
        }

        setWorkDetails({
          id: work.id,
          company: work.company,
          place: work.place,
          position: work.position,
          startWork: work.startWork,
          endWork: work.endWork,
          roles: work.roles,
          stillWorking: work.stillWorking,
        });
      }
    });
    addWorkBtn.current.style.cssText = "display: none;";
    submitWorkBtn.current.style.cssText = "display: none;";
    updateWorkBtn.current.style.cssText = "display: flex;";
    workForm.current.style.cssText = "display: flex;";
    limitErrorDiv.current.style.cssText = "display: none;";
    roleCardsDiv.current.style.cssText = "border: 1px solid rgb(55, 55, 55);";
  }

  function updateWork() {
    if (
      workDetails.company !== "" &&
      workDetails.place !== "" &&
      workDetails.position !== "" &&
      workDetails.startWork !== ""
    ) {
      const updatedExperiences = experiences.map((work) => {
        if (work.id === workDetails.id) {
          return {
            ...work,
            company: workDetails.company,
            place: workDetails.place,
            position: workDetails.position,
            startWork: workDetails.startWork,
            endWork: workDetails.endWork,
            roles: workDetails.roles,
            stillWorking: workDetails.stillWorking,
          };
        } else {
          return work;
        }
      });
      setExperiences(updatedExperiences);
      setWorkDetails({
        id: 0,
        company: "",
        place: "",
        position: "",
        startWork: "",
        endWork: "",
        roles: [],
        stillWorking: false,
      });
      setRole({
        id: 0,
        value: "",
      });
      updateWorkBtn.current.style.cssText = "display: none;";
      addWorkBtn.current.style.cssText = "display: flex;";
      submitWorkBtn.current.style.cssText = "display: flex;";
      workForm.current.style.cssText = "display: none;";
      updateRoleBtn.current.style.cssText = "display: none;";
      addRoleBtn.current.style.cssText = "display: flex;";
      roleCardsDiv.current.style.cssText = "border: none;";
    }
  }

  function deleteWork(workId) {
    setExperiences(experiences.filter((exp) => exp.id !== workId));
    limitErrorDiv.current.style.cssText = "display: none;";

    if (workDetails.id === workId || experiences.length === 1) {
      updateRoleBtn.current.style.cssText = "display: none;";
      addRoleBtn.current.style.cssText = "display: flex;";
      workForm.current.style.cssText = "display: none;";
      addWorkBtn.current.style.cssText = "display: flex;";
      updateWorkBtn.current.style.cssText = "display: none;";
      submitWorkBtn.current.style.cssText = "display: flex;";
      roleCardsDiv.current.style.cssText = "border: none;";

      setWorkDetails({
        id: 0,
        company: "",
        place: "",
        position: "",
        startWork: "",
        endWork: "",
        roles: [],
        stillWorking: false,
      });
      setRole({ id: 0, value: "" });
    }
  }

  function handleSubmit(e) {
    // Prevent form submission to avoid page reload
    e.preventDefault();

    // Logic to add work to the experiences state
    setExperiences([
      ...experiences,
      { ...workDetails, id: crypto.randomUUID() },
    ]);

    // Display the add button again
    addWorkBtn.current.style.cssText = "display: flex;";

    // Hide the form
    workForm.current.style.cssText = "display: none;";

    // Display the class containing Work component cards
    document.querySelector(".work-cards").style.cssText = "display: flex;";

    roleCardsDiv.current.style.cssText = "border: none;";
  }

  function handleCancel() {
    // Display the add button again
    addWorkBtn.current.style.cssText = "display: flex;";

    // Hide the form
    workForm.current.style.cssText = "display: none;";

    // Hide Update role button and bring back Add role button
    updateRoleBtn.current.style.cssText = "display: none;";
    addRoleBtn.current.style.cssText = "display: flex;";

    // Hide Update button and bring back submit button
    updateWorkBtn.current.style.cssText = "display: none;";
    submitWorkBtn.current.style.cssText = "display: flex;";
    roleCardsDiv.current.style.cssText = "border: none;";

    // Reset workDetails and role
    setWorkDetails({
      id: 0,
      company: "",
      place: "",
      position: "",
      startWork: "",
      endWork: "",
      roles: [],
      stillWorking: false,
    });
    setRole({ id: 0, value: "" });
  }

  function addRole() {
    if (workDetails.roles.length < roleLimit && role.value !== "") {
      setWorkDetails({
        ...workDetails,
        roles: [
          ...workDetails.roles,
          { id: crypto.randomUUID(), value: role.value },
        ],
      });
      roleCardsDiv.current.style.cssText = "border: 1px solid rgb(55, 55, 55);";
    }
    setRole({ id: 0, value: "" });
    if (workDetails.roles.length + 1 === roleLimit) {
      addRoleBtn.current.disabled = true;
    }
  }

  function editRole(roleId) {
    workDetails.roles.forEach((r) => {
      if (r.id === roleId) {
        setRole({ id: r.id, value: r.value });
      }
    });
    updateRoleBtn.current.style.cssText = "display: flex;";
    addRoleBtn.current.style.cssText = "display: none;";
    limitErrorDiv.current.style.cssText = "display: none;";
  }

  function updateRole() {
    if (role.value !== "") {
      const updatedRoles = workDetails.roles.map((r) => {
        if (r.id === role.id) {
          return { ...r, value: role.value };
        } else {
          return r;
        }
      });
      setWorkDetails({ ...workDetails, roles: updatedRoles });
      setRole({ id: 0, value: "" });
      updateRoleBtn.current.style.cssText = "display: none;";
      addRoleBtn.current.style.cssText = "display: flex;";

      if (workDetails.roles.length === roleLimit) {
        addRoleBtn.current.disabled = true;
      } else {
        addRoleBtn.current.disabled = false;
      }
    }
  }

  function deleteRole(roleId) {
    setWorkDetails({
      ...workDetails,
      roles: workDetails.roles.filter((role) => role.id !== roleId),
    });

    if (role.id === roleId || workDetails.roles.length === 1) {
      updateRoleBtn.current.style.cssText = "display: none;";
      addRoleBtn.current.style.cssText = "display: flex;";
      setRole({ id: 0, value: "" });
    }

    if (workDetails.roles.length === 1) {
      roleCardsDiv.current.style.cssText = "border: none;";
    }

    limitErrorDiv.current.style.cssText = "display: none;";

    if (workDetails.roles.length - 1 === roleLimit) {
      addRoleBtn.current.disabled = true;
    } else {
      addRoleBtn.current.disabled = false;
    }
  }

  return (
    <div className="work">
      <div
        className="work-header"
        onClick={() => {
          setMainVisible(!mainVisible);
        }}
      >
        <h3
          onClick={() => {
            setMainVisible(!mainVisible);
          }}
        >
          Work Experience
        </h3>
        <svg
          ref={dropDownSvg}
          onClick={() => {
            setMainVisible(!mainVisible);
          }}
          className={
            mainVisible ? "dropdown-svg rotate-dropdown" : "dropdown-svg"
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
          />
        </svg>
      </div>
      <div className={mainVisible ? "work-main visible" : "work-main"}>
        <button
          type="button"
          id="add-work"
          ref={addWorkBtn}
          onClick={() => addWork()}
        >
          <svg
            style={{ width: "25px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V13.53C21.42,13 20.75,12.6 20,12.34V8H4V19H12.08C12.2,19.72 12.45,20.39 12.8,21H4A2,2 0 0,1 2,19V8A2,2 0 0,1 4,6H8V4A2,2 0 0,1 10,2M14,6V4H10V6H14M14,17H17V14H19V17H22V19H19V22H17V19H14V17Z"
            />
          </svg>
          <span>Add Work Experience</span>
        </button>
        <div className="limit-error" ref={limitErrorDiv}>
          Work limit reached!
        </div>
        <form
          className="work-form"
          ref={workForm}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="work-company-position">
            <div className="work-company-name">
              <label htmlFor="company">Company name </label>
              <input
                type="text"
                id="company"
                value={workDetails.company}
                onChange={(e) =>
                  setWorkDetails({ ...workDetails, company: e.target.value })
                }
                autoComplete="on"
                required
              />
            </div>
            <div className="work-position">
              <label htmlFor="position">Position </label>
              <input
                type="text"
                id="position"
                value={workDetails.position}
                onChange={(e) =>
                  setWorkDetails({ ...workDetails, position: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="work-dates">
            <div
              className="work-company-location"
              style={{ width: workDetails.stillWorking && "425px" }}
            >
              <label htmlFor="place">Company location </label>
              <input
                type="text"
                id="place"
                value={workDetails.place}
                onChange={(e) =>
                  setWorkDetails({ ...workDetails, place: e.target.value })
                }
                required
              />
            </div>
            <div
              className="work-start-date"
              style={{ width: workDetails.stillWorking && "425px" }}
            >
              <label htmlFor="start-work">Position start date </label>
              <input
                type="date"
                id="start-work"
                value={workDetails.startWork}
                onChange={(e) =>
                  setWorkDetails({ ...workDetails, startWork: e.target.value })
                }
                required
              />
            </div>
            {!workDetails.stillWorking && (
              <div className="work-end-date">
                <label htmlFor="end-work">Position end date </label>
                <input
                  type="date"
                  id="end-work"
                  value={workDetails.endWork}
                  onChange={(e) =>
                    setWorkDetails({ ...workDetails, endWork: e.target.value })
                  }
                  required
                />
              </div>
            )}
          </div>
          <div className="work-still-working">
            <label htmlFor="still-working">Still Working? </label>
            <input
              type="checkbox"
              id="still-working"
              checked={workDetails.stillWorking}
              onChange={(e) =>
                setWorkDetails({
                  ...workDetails,
                  endWork: "",
                  stillWorking: e.target.checked,
                })
              }
            />
          </div>
          <div className="work-role">
            <label htmlFor="role">Job roles</label>
            <div>
              <input
                type="text"
                id="role"
                value={role.value}
                onChange={(e) => setRole({ ...role, value: e.target.value })}
              />
              <>
                <button
                  type="button"
                  ref={addRoleBtn}
                  onClick={() => addRole()}
                  id="add-role"
                >
                  Add role
                </button>
                <button
                  type="button"
                  ref={updateRoleBtn}
                  onClick={() => updateRole()}
                  id="update-role"
                >
                  Update role
                </button>
              </>
            </div>
          </div>
          <div className="work-form-btns">
            <button
              type="button"
              id="cancel-work"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button type="submit" ref={submitWorkBtn} id="submit-work">
              Submit
            </button>
            <button
              id="update-work"
              type="button"
              ref={updateWorkBtn}
              onClick={() => updateWork()}
            >
              Update
            </button>
          </div>
          <ul className="role-cards" ref={roleCardsDiv}>
            {workDetails.roles &&
              workDetails.roles.map((role) => (
                <Fragment key={role.id}>
                  <Role
                    role={role}
                    editRole={editRole}
                    deleteRole={deleteRole}
                  />
                  <hr />
                </Fragment>
              ))}
          </ul>
        </form>
        <div className="work-cards">
          {experiences &&
            experiences.map((exp) => (
              <Work
                key={exp.id}
                work={exp}
                editWork={editWork}
                deleteWork={deleteWork}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
