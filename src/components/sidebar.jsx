import { IoMdAdd } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { MdAddToHomeScreen } from "react-icons/md";
import { SiMinds } from "react-icons/si";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div
        class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar"
        style={{ width: "280px" }}
      >
        {" "}
        <a
          href="/dashboard"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          {" "}
          <svg
            class="bi pe-none me-2"
            width="40"
            height="32"
            aria-hidden="true"
          >
            <use xlink:href="#bootstrap"></use>
          </svg>{" "}
          <span class="fs-4">Sidebar</span>{" "}
        </a>{" "}
        <hr />{" "}
        <ul class="nav nav-pills flex-column mb-auto">
          {" "}
          <li class="nav-item">
            {" "}
            <Link to='/dashboard' class="nav-link active" aria-current="page">
              {" "}
              <svg
                class="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
               <MdAddToHomeScreen />
              </svg>
              Thoughts
            </Link>{" "}
          </li>{" "}
          <li>
            {" "}
            <Link to="/dashboard/create" class="nav-link text-white">
              {" "}
              <svg
                class="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <IoMdAdd />
              </svg>
              Create Thought
            </Link>{" "}
          </li>{" "}
          <li>
            {" "}
            <Link to="/dashboard/voice-create" class="nav-link text-white">
              {" "}
              <svg
                class="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <FaMicrophone />
              </svg>
              Share your Thought oraly
            </Link>{" "}
          </li>{" "}
           <li>
            {" "}
            <Link to="/dashboard/my-thoughts" class="nav-link text-white">
              {" "}
              <svg
                class="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <SiMinds />
              </svg>
              My thoughts
            </Link>{" "}
          </li>{" "}
        
        </ul>{" "}
        <hr />{" "}
        <div class="dropdown">
          {" "}
          <a
            href="#"
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {" "}
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              class="rounded-circle me-2"
            />{" "}
            <strong>mdo</strong>{" "}
          </a>{" "}
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            {" "}
            <li>
              <a class="dropdown-item" href="#">
                New project...
              </a>
            </li>{" "}
            <li>
              <a class="dropdown-item" href="#">
                Settings
              </a>
            </li>{" "}
            <li>
              <a class="dropdown-item" href="#">
                Profile
              </a>
            </li>{" "}
            <li>
              <hr class="dropdown-divider" />
            </li>{" "}
            <li>
              <a class="dropdown-item" href="#">
                Sign out
              </a>
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </div>
    </>
  );
};
export default SideBar;
