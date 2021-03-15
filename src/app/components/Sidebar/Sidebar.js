import * as React from "react";
import { Container, Form, Button, CloseButton, Card } from "react-bootstrap";
import Checkbox from "../Checkbox/Checkbox";
import "./sidebar.scss";

const Sidebar = ({
    setShowSidebar,
    setDisplayProjects,
    projects,
    search,
    setFilteredProjects,
    sidebarFilters,
    sidebarSetFilters,
}) => {
    const handleCheck = (e) => {
        e.target.checked = !e.target.checked;
        sidebarSetFilters((sidebarFilter) => ({
            ...sidebarFilter,
            [e.target.name]: !sidebarFilter[e.target.name],
        }));
    };

    const handleReset = () => {
        setFilteredProjects(projects);
        setDisplayProjects(
            projects.filter((project) => {
                return (
                    project.ProjectTitle.toLowerCase().includes(
                        search.toLowerCase()
                    ) ||
                    project.Professor.toLowerCase().includes(
                        search.toLowerCase()
                    )
                );
            })
        );
        sidebarSetFilters({
            Formal: false,
            Informal: false,
            LOP: false,
            DOP: false,
            SOP: false,
            previousSem: false,
            upcomingSem: false,
            Chemical: false,
            Phoenix: false,
            Pharmacy: false,
            Math: false,
            Economics: false,
            Civil: false,
            Biology: false,
            "Computer Science": false,
            "Mechanical & Manufacturing": false,
            projectAll: true,
            courseAll: true,
            departmentAll: true,
        });
    }

    const handleSubmit = () => {
        let newFilteredProjects = [];
        let courses = [
            "Chemical",
            "Phoenix",
            "Pharmacy",
            "Math",
            "Economics",
            "Civil",
            "Biology",
            "Computer Science",
            "Mechanical & Manufacturing",
        ];

        if (sidebarFilters.departmentAll === true) {
            newFilteredProjects = projects;
        } else {
            for (let i in courses) {
                if (sidebarFilters[courses[i]] === true) {
                    newFilteredProjects = newFilteredProjects.concat(
                        projects.filter(
                            (project) => project.Department === courses[i]
                        )
                    );
                }
            }
        }

        if (sidebarFilters.projectAll === false) {
            if (sidebarFilters["Informal"] === false) {
                newFilteredProjects = newFilteredProjects.filter(
                    (project) => project.isFormal === true
                );
            }
            if (sidebarFilters["Formal"] === false) {
                newFilteredProjects = newFilteredProjects.filter((project) => {
                    return !project.isFormal;
                });
            }
        }

        if (sidebarFilters.courseAll === false) {
            if (sidebarFilters["LOP"] === false) {
                newFilteredProjects = newFilteredProjects.filter(
                    (project) =>
                        project.ProjectType && project.ProjectType !== "LOP"
                );
            }

            if (sidebarFilters["SOP"] === false) {
                newFilteredProjects = newFilteredProjects.filter(
                    (project) =>
                        project.ProjectType && project.ProjectType !== "SOP"
                );
            }

            if (sidebarFilters["DOP"] === false) {
                newFilteredProjects = newFilteredProjects.filter(
                    (project) =>
                        project.ProjectType && project.ProjectType !== "DOP"
                );
            }
        }

        setFilteredProjects(newFilteredProjects);
        setDisplayProjects(
            newFilteredProjects.filter((project) => {
                return (
                    project.ProjectTitle.toLowerCase().includes(
                        search.toLowerCase()
                    ) ||
                    project.Professor.toLowerCase().includes(
                        search.toLowerCase()
                    )
                );
            })
        );
    };

    return (
        <>
            <div className={`h-100 sidebar pb-5 px-3 text-primary`}>
                <Container className="pb-5">
                    <CloseButton
                        onClick={() => setShowSidebar(false)}
                        className="close-btn"
                    />

                    <Form>
                        <div className="mb-3">
                            <Card className="sidebar__card py-3 pr-3">
                                <h4 className="mb-3 text-black">
                                    Project Types
                                </h4>
                                <Checkbox
                                    label="Formal"
                                    name="Formal"
                                    onChange={(e) => handleCheck(e)}
                                    checked={sidebarFilters.Formal}
                                ></Checkbox>
                                <Checkbox
                                    label="Informal"
                                    name="Informal"
                                    onChange={(e) => handleCheck(e)}
                                    checked={sidebarFilters.Informal}
                                ></Checkbox>
                                <Checkbox
                                    label="All"
                                    name="projectAll"
                                    onChange={(e) => handleCheck(e)}
                                    checked={sidebarFilters.projectAll}
                                ></Checkbox>
                            </Card>
                        </div>
                        <div className="mb-3">
                            <Card className="sidebar__card py-3 pr-3">
                                <h4 className="mb-3 text-black">
                                    Course Types
                                </h4>
                                <Checkbox
                                    label="LOP"
                                    name="LOP"
                                    onChange={(e) => handleCheck(e)}
                                    checked={sidebarFilters.LOP}
                                ></Checkbox>
                                <Checkbox
                                    label="DOP"
                                    name="DOP"
                                    onChange={(e) => handleCheck(e)}
                                    checked={sidebarFilters.DOP}
                                ></Checkbox>
                                <Checkbox
                                    label="SOP"
                                    name="SOP"
                                    onChange={(e) => handleCheck(e)}
                                    checked={sidebarFilters.SOP}
                                ></Checkbox>
                                <Checkbox
                                    label="All"
                                    name="courseAll"
                                    onChange={(e) => handleCheck(e)}
                                    checked={sidebarFilters.courseAll}
                                ></Checkbox>
                            </Card>
                        </div>
                        <div className="mb-3">
                            <Card className="sidebar__card py-3 pr-3">
                                <h4 className="mb-3 text-black">
                                    Project Time
                                </h4>
                                <Checkbox
                                    label="Previous Semesters"
                                    name="previousSem"
                                    onChange={(e) => handleCheck(e)}
                                    checked={sidebarFilters.previousSem}
                                ></Checkbox>
                                <Checkbox
                                    label="Upcoming Semester"
                                    name="upcomingSem"
                                    onChange={(e) => handleCheck(e)}
                                    checked={sidebarFilters.upcomingSem}
                                ></Checkbox>
                            </Card>
                        </div>
                        <div className="mb-3">
                            <Card className="sidebar__card py-3 pr-3">
                                <h4 className="mb-3 text-black">Departments</h4>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <Checkbox
                                            label="Chemical"
                                            name="Chemical"
                                            onChange={(e) => handleCheck(e)}
                                            checked={sidebarFilters.Chemical}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Pharmacy"
                                            name="Pharmacy"
                                            onChange={(e) => handleCheck(e)}
                                            checked={sidebarFilters.Pharmacy}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Economics"
                                            name="Economics"
                                            onChange={(e) => handleCheck(e)}
                                            checked={sidebarFilters.Economics}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Biology"
                                            name="Biology"
                                            onChange={(e) => handleCheck(e)}
                                            checked={sidebarFilters.Biology}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Computer Science"
                                            name="Computer Science"
                                            onChange={(e) => handleCheck(e)}
                                            checked={
                                                sidebarFilters[
                                                    "Computer Science"
                                                ]
                                            }
                                        ></Checkbox>
                                        <Checkbox
                                            label="Mechanical &amp; Manufcaturing"
                                            name="Mechanical & Manufacturing"
                                            onChange={(e) => handleCheck(e)}
                                            checked={
                                                sidebarFilters[
                                                    "Mechanical & Manufacturing"
                                                ]
                                            }
                                        ></Checkbox>
                                    </div>
                                    <div className="col-sm-6">
                                        <Checkbox
                                            label="Phoenix"
                                            name="Phoenix"
                                            onChange={(e) => handleCheck(e)}
                                            checked={sidebarFilters.Phoenix}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Math"
                                            name="Math"
                                            onChange={(e) => handleCheck(e)}
                                            checked={sidebarFilters.Math}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Civil"
                                            name="Civil"
                                            onChange={(e) => handleCheck(e)}
                                            checked={sidebarFilters.Civil}
                                        ></Checkbox>
                                        <Checkbox
                                            label="All"
                                            name="departmentAll"
                                            onChange={(e) => handleCheck(e)}
                                            checked={
                                                sidebarFilters.departmentAll
                                            }
                                        ></Checkbox>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <Card className="sidebar__card py-4 px-2 b-0 u-bb-none">
                            <Button
                                variant="outline-primary"
                                className="btn-block btn-outline"
                                onClick={handleSubmit}
                            >
                                Apply Filter
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="my-2 btn-block btn-outline"
                                onClick={handleReset}
                            >
                                Reset Filter
                            </Button>
                        </Card>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default Sidebar;
