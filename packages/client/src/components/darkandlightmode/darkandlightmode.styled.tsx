import styled from "styled-components";



export const StyledWrapper = styled("div")`
  .btn-container {
    padding-left: 3rem;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .btn-container i {
    display: inline-block;
    position: relative;
    top: -9px;
  }

  label {
    font-size: 15px;
    color: #424242;
    font-weight: 500;
    top: 1px;
  }

  .btn-color-mode-switch {
    display: inline-block;
    margin: 0px;
    position: relative;
  }

  .btn-color-mode-switch > label.btn-color-mode-switch-inner {
    margin: 0px;
    width: 150px;
    height: 30px;
    background: #e0e0e0;
    border-radius: 26px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    /*box-shadow: 0px 0px 8px 0px rgba(17, 17, 17, 0.34) inset;*/
    display: block;
  }

  .btn-color-mode-switch > label.btn-color-mode-switch-inner:before {
    content: attr(data-on);
    position: absolute;
    font-size: 15px;
    font-weight: 500;
    top: 7px;
    right: 20px;
  }

  .btn-color-mode-switch > label.btn-color-mode-switch-inner:after {
    content: attr(data-off);
    width: 70px;
    height: 28px;
    background: #fff;
    border-radius: 26px;
    position: absolute;
    left: 2px;
    top: 2px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0px 0px 6px -2px #111;
    padding: 5px 0px;
  }

  .btn-color-mode-switch > .alert {
    display: none;
    background: #ff9800;
    border: none;
    color: #fff;
  }

  .btn-color-mode-switch input[type="checkbox"] {
    cursor: pointer;
    width: 50px;
    height: 25px;
    opacity: 0;
    position: absolute;
    top: 0;
    z-index: 1;
    margin: 0px;
  }

  .btn-color-mode-switch
    input[type="checkbox"]:checked
    + label.btn-color-mode-switch-inner {
    background: #151515;
    color: #fff;
  }

  .btn-color-mode-switch
    input[type="checkbox"]:checked
    + label.btn-color-mode-switch-inner:after {
    content: attr(data-on);
    left: 80px;
    background: #3c3c3c;
  }

  .btn-color-mode-switch
    input[type="checkbox"]:checked
    + label.btn-color-mode-switch-inner:before {
    content: attr(data-off);
    right: auto;
    left: 20px;
  }

  .btn-color-mode-switch input[type="checkbox"]:checked ~ .alert {
    display: block;
  }

  .dark-preview {
    background: #0d0d0d;
  }

  .white-preview {
    background: #fff;
  }
`;
