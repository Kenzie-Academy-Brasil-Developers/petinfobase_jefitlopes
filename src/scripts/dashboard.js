import { render } from "./render.js";
import { getUserProfile } from "./request.js";

function authentication() {
    const token = localStorage.getItem('@petInfo:token');
  
    if(!token) {
      window.location.replace('../../index.html');
    }
  }

authentication();
render();
await getUserProfile();
