import { detectPageChanges } from "../testerInteractions/detectPageChanges";

window.addEventListener('DOMContentLoaded', event => {
    console.log('DOMContentLoaded');
    detectPageChanges((newPage) => console.log("page change detected", { newPage }));
});