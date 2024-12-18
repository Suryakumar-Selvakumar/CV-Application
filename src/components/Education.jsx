import "../styles/Education.css";

export function Education(props) {
  const education = props.education;
  function formatDate(date) {
    date = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = months[date.getMonth()];

    return `${monthName} ${date.getFullYear()}`;
  }

  const mediaQuery = window.matchMedia(
    "(min-width: 360px) and (max-width: 767px)"
  );

  return (
    <div
      className="education-card"
      data-id={education.id}
    >
      <div>
        <div>
          <p>{education.titleStudy}</p>
          {!mediaQuery.matches && <hr />}
        </div>
        {!mediaQuery.matches && (
          <div
            style={{
              justifyContent: !education.startDateStudy && "start",
              gap: !education.startDateStudy && "1rem",
            }}
          >
            <p>{education.gpa}</p>
            {education.startDateStudy && (
              <>
                <hr />
                <p>{formatDate(education.startDateStudy)}</p>
              </>
            )}
            <hr />
            {education.completedStudy ? (
              <p>{formatDate(education.endDateStudy)}</p>
            ) : (
              <p>Exp. Grad. {formatDate(education.endDateStudy)}</p>
            )}
          </div>
        )}
      </div>
      <div>
        <button
          id="delete-education"
          type="button"
          onClick={() => props.deleteEducation(education.id)}
        >
          <svg
            style={{ width: "27.5px" }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 5L4.99998 19M5.00001 5L19 19"
              stroke="red"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          id="edit-education"
          type="button"
          onClick={() => props.editEducation(education.id)}
        >
          <svg
            style={{ width: "30px" }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6716 6.763L5.58013 15.8544L5.41376 18.8492L8.40856 18.6829L17.5 9.59142M14.6716 6.763L16.0204 5.41421C16.8014 4.63316 18.0677 4.63316 18.8488 5.41421V5.41421C19.6298 6.19526 19.6298 7.46159 18.8488 8.24264V8.24264L17.5 9.59142M14.6716 6.763L17.5 9.59142"
              stroke="rgb(0, 140, 255)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
