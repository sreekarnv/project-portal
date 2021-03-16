import * as React from "react";
import { Container, Form, Button, CloseButton, Card } from "react-bootstrap";
import Checkbox from "../Checkbox/checkbox.js";

import {FilterContext} from '../../context/FilterContext'

import "./sidebar.scss";

const Sidebar = ({
    setShowSidebar,
}) => {

    const FilterOptions = React.useContext(FilterContext);

    const handleCheck = (e) => {
        //e.target.checked = !e.target.checked;
        FilterOptions.handleFilterChanged(e.target.getAttribute("subfilter"), e.target.name, !e.target.checked);
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
                                    subFilter="isFormal"
                                    name="Formal"
                                    onChange={(e) => handleCheck(e)}
                                    checked={FilterOptions.filters.isFormal.Formal}
                                ></Checkbox>
                                <Checkbox
                                    label="Informal"
                                    subFilter="isFormal"
                                    name="Informal"
                                    onChange={(e) => handleCheck(e)}
                                    checked={FilterOptions.filters.isFormal.Informal}
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
                                    subFilter="ProjectType"
                                    name="LOP"
                                    onChange={(e) => handleCheck(e)}
                                    checked={FilterOptions.filters.ProjectType.LOP}
                                ></Checkbox>
                                <Checkbox
                                    label="DOP"
                                    subFilter="ProjectType"
                                    name="DOP"
                                    onChange={(e) => handleCheck(e)}
                                    checked={FilterOptions.filters.ProjectType.DOP}
                                ></Checkbox>
                                <Checkbox
                                    label="SOP"
                                    subFilter="ProjectType"
                                    name="SOP"
                                    onChange={(e) => handleCheck(e)}
                                    checked={FilterOptions.filters.ProjectType.SOP}
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
                                    subFilter="ProjectTime"
                                    name="previousSem"
                                    onChange={(e) => handleCheck(e)}
                                    checked={FilterOptions.filters.ProjectTime.previousSem}
                                ></Checkbox>
                                <Checkbox
                                    label="Upcoming Semester"
                                    subFilter="ProjectTime"
                                    name="upcomingSem"
                                    onChange={(e) => handleCheck(e)}
                                    checked={FilterOptions.filters.ProjectTime.upcomingSem}
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
                                            subFilter="Department"
                                            name="Chemical"
                                            onChange={(e) => handleCheck(e)}
                                            checked={FilterOptions.filters.Department.Chemical}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Pharmacy"
                                            subFilter="Department"
                                            name="Pharmacy"
                                            onChange={(e) => handleCheck(e)}
                                            checked={FilterOptions.filters.Department.Pharmacy}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Economics"
                                            subFilter="Department"
                                            name="Economics"
                                            onChange={(e) => handleCheck(e)}
                                            checked={FilterOptions.filters.Department.Economics}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Biology"
                                            subFilter="Department"
                                            name="Biology"
                                            onChange={(e) => handleCheck(e)}
                                            checked={FilterOptions.filters.Department.Biology}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Computer Science"
                                            subFilter="Department"
                                            name="Computer Science"
                                            onChange={(e) => handleCheck(e)}
                                            checked={
                                                FilterOptions.filters.Department["Computer Science"]
                                            }
                                        ></Checkbox>
                                        <Checkbox
                                            label="Mechanical &amp; Manufcaturing"
                                            subFilter="Department"
                                            name="Mechanical & Manufacturing"
                                            onChange={(e) => handleCheck(e)}
                                            checked={
                                                FilterOptions.filters.Department["Mechanical & Manufacturing"]
                                            }
                                        ></Checkbox>
                                    </div>
                                    <div className="col-sm-6">
                                        <Checkbox
                                            label="Phoenix"
                                            subFilter="Department"
                                            name="Phoenix"
                                            onChange={(e) => handleCheck(e)}
                                            checked={FilterOptions.filters.Department.Phoenix}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Math"
                                            subFilter="Department"
                                            name="Math"
                                            onChange={(e) => handleCheck(e)}
                                            checked={FilterOptions.filters.Department.Math}
                                        ></Checkbox>
                                        <Checkbox
                                            label="Civil"
                                            subFilter="Department"
                                            name="Civil"
                                            onChange={(e) => handleCheck(e)}
                                            checked={FilterOptions.filters.Department.Civil}
                                        ></Checkbox>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <Card className="sidebar__card py-4 px-2 b-0 u-bb-none">
                            <Button
                                variant="outline-primary"
                                className="btn-block btn-outline"
                                onClick={FilterOptions.handleFilterApply}
                            >
                                Apply Filter
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="my-2 btn-block btn-outline"
                                onClick={FilterOptions.handleFilterReset}
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
