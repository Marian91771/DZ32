import Table from 'react-bootstrap/Table';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import ModalFormDepartments from '../components/ModalFormDepartments';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadDepartmentsAsync } from '../store/DepartmentsSlice';
import { deleteDepartmentsAsync } from '../store/DepartmentsSlice';
import { updateDepartmentAsync } from '../store/DepartmentsSlice';

export default function DepartmentsPage() {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();
    const departmentsList = useSelector((state) => state.departments.data);

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setEditData(null);
    };

    const handleShow = () => setShow(true);

    const handleEdit = (dept) => {
        setEditMode(true);
        setEditData(dept);
        setShow(true);
    };

    const handleSaveEdit = (updatedDept) => {
        dispatch(updateDepartmentAsync(updatedDept));
    };

    useEffect(() => {
        dispatch(loadDepartmentsAsync());
    }, [dispatch]);

    const filteredDepartments = departmentsList.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.managerLastName.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>


            <Container className="my-4">
                <Row className="align-items-center">
                    <Col md="4">
                        <h3>Departments</h3>
                    </Col>

                    <Col md="5">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </Col>

                    <Col md="3" className="text-end">
                        <Button variant="primary" onClick={handleShow}>Create</Button>
                    </Col>
                </Row>
            </Container>

            {
                filteredDepartments.length === 0 ? (<h3>No data</h3>) :
                    (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name of Department</th>
                                    <th>Manager's Last Name</th>
                                    <th>Email</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDepartments.map((dept, index) => (
                                    <tr key={dept.id}>
                                        <td>{index + 1}</td>
                                        <td>{dept.name}</td>
                                        <td>{dept.managerLastName}</td>
                                        <td>{dept.email}</td>
                                        <td>{dept.location}</td>
                                        <td>
                                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(dept)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => dispatch(deleteDepartmentsAsync(dept.id))}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }
            <ModalFormDepartments
                show={show}
                handleClose={handleClose}
                editMode={editMode}
                editData={editData}
                onSave={handleSaveEdit}
            />
        </>
    );
}
