import React from "react";
import { Pane } from "evergreen-ui";

const WordpressInstructions = () => (
  <>
    <h3 className="tx-20 mg-y-25">Integrate Platform:</h3>
    <p className="tx-16">
      <ul className="mb-0 pl-3">
        <li>Go to your WordPress Dashboard</li>
        <li>
          Click on Plugins in the menu on the left, and then click on Add New
          underneath
        </li>
        <li>Type „Vuukle“ in Search and press Enter on your keyboard</li>
        <li>Click on Install Now button</li>
        <li>On next screen, click on Activate Now</li>
      </ul>
    </p>
    <p className="tx-16">
      Have difficulties? -{" "}
      <a
        className="tx-semibold tx-color-brand"
        href="mailto:billing@vuukle.com"
      >
        <u>write to us</u>
      </a>{" "}
      or check installation guide on{" "}
      <a
        href="https://docs.vuukle.com/how-to-install-vuukle-on-a-wordpress-blog/"
        target="_blank"
        className="tx-semibold tx-color-brand"
      >
        <u>docs.vuukle.com</u>
      </a>
    </p>
  </>
);

export default WordpressInstructions;
