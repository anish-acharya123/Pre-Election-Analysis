// import "./styles.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
// import "./Faq.css";

export default function FAQ() {
  return (
    <div className="flex justify-center items-center py-10 flex-col">
      <Accordion
        allowZeroExpanded={true}
        className="max-w-[1440px] w-full grid gap-10 text-[12px] px-6 md:text-[16px]"
      >
        <h1 className="text-center  md:text-[52px] text-[32px]  py-4 sm:block  font-semibold text-[#12529C] leading-[100%]">
          FAQs
        </h1>
        <div className="flex flex-col gap-2">
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className="rounded-md p-4 bg-gray-300 text-black">
                1. What's AEAS?{" "}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                AEAS is an automated entry poll system. It gives results based
                on the vote data collected.
              </p>
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className="rounded-md p-4 bg-gray-300 text-black">
                2. What is this website about?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                This website simulates an entry poll for a mock election. Users
                can vote for their preferred candidate, and the website displays
                results such as predicted winners, age group preferences,
                gender-based classifications, and other visualizations.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className="rounded-md p-4 bg-gray-300 text-black">
                3. How do I vote in the mock election?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                To vote, simply login using the necessary information that you
                need to use even during real election and then select your
                preferred candidate from the list and submit your choice. Your
                vote will be recorded and included in the results displayed on
                the site.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className="rounded-md p-4 bg-gray-300 text-black">
                4. Can I vote multiple times?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>No, each user is allowed to vote only once.</p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className="rounded-md p-4 bg-gray-300 text-black">
                5. How are the results displayed?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                Results are displayed in the analysis section of the page after
                the voting period is over.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className="rounded-md p-4 bg-gray-300 text-black">
                6. Is my personal information safe?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                Yes, your personal information is kept confidential. We only use
                your data to record your vote and display aggregate results
                without identifying individual voters.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton className="rounded-md p-4 bg-gray-300 text-black">
                7. Can I see historical data or past results?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                Currently, the website only displays the results of the ongoing
                mock election. Historical data or past results are not available
                on this site
              </p>
            </AccordionItemPanel>
          </AccordionItem>
        </div>
      </Accordion>
    </div>
  );
}
