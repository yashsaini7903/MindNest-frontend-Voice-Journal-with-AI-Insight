const Header = () => {
  return (
    <header class="p-3 bg-dark text-white">
  <div class="container">
    <div
      class="d-flex flex-wrap align-items-center justify-content-between"
    >
      <a
        href="/"
        class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
      >
        <img
          src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
          alt="Logo"
          width="40"
          height="32"
          class="me-2"
        />
        <span class="fs-4 fw-bold">MyProject</span>
      </a>

      
      <div class="text-end">
        <a href="/login" class="btn btn-outline-light me-2">Login</a>
        <a href="/signup" class="btn btn-warning">Sign Up</a>
      </div>
    </div>
  </div>
</header>

  );
};
export default Header;
