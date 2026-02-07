import { AccordionDetails, AccordionSummary, Accordion } from "@mui/material";
import React from "react";
import styles from "./accordion.module.css";
import { BiChevronDown } from "react-icons/bi";
import MyPagination from "../../ui/MyPagination";
import Empty from "../../ui/Empty";
import { t } from "i18next";
const AccordionComponent = ({ data, total }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className={styles.faq}>
            {data.length
                ? data.map((ele, index) => {
                      return (
                          <Accordion
                              key={index}
                              expanded={expanded === `panel${index + 1}`}
                              onChange={handleChange(`panel${index + 1}`)}
                          >
                              <AccordionSummary
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                  expandIcon={
                                      <span className={styles.icon}>
                                          <BiChevronDown />
                                      </span>
                                  }
                              >
                                  <h3 className={styles.question}>
                                      {ele.question}
                                  </h3>
                              </AccordionSummary>
                              <AccordionDetails>
                                  <p className={styles.answer}>{ele.answer}</p>
                              </AccordionDetails>
                          </Accordion>
                      );
                  })
                : ""}
            {!data.length ? (
                <div className={styles.white}>
                    <Empty text={t("no-faqs")} />
                </div>
            ) : (
                ""
            )}
            {total ? (
                <div className="pagination">
                    <MyPagination dataLength={total || 1} pagePerView={20} />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default AccordionComponent;
