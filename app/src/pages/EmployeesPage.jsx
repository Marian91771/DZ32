import Table from 'react-bootstrap/Table';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import ModalFormEmployees from '../components/ModalFormEmployees';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadEmployeesAsync } from '../store/EmployeesSlice';
import { deleteEmployeesAsync } from '../store/EmployeesSlice';
import { updateEmployeeAsync } from '../store/EmployeesSlice';

export default function EmployeesPage() {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();
    const employeesList = useSelector((state) => state.employees.data);

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setEditData(null);
    };

    const handleShow = () => setShow(true);

    const handleEdit = (empl) => {
        setEditMode(true);
        setEditData(empl);
        setShow(true);
    };

    const handleSaveEdit = (updatedEmpl) => {
        dispatch(updateEmployeeAsync(updatedEmpl));
    };

    useEffect(() => {
        dispatch(loadEmployeesAsync());
    }, [dispatch]);

    const filteredEmployees = employeesList.filter(emp =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Container className="my-4">
                <Row className="align-items-center">
                    <Col md="4">
                        <h3>Employees</h3>
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
                filteredEmployees.length === 0 ? (<h3>No data</h3>) :
                    (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((emp, index) => (
                                    <tr key={emp.id}>
                                        <td>{index + 1}</td>
                                        <td>{emp.firstName}</td>
                                        <td>{emp.lastName}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.position}</td>
                                        <td>{emp.department}</td>
                                        <td>
                                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(emp)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => dispatch(deleteEmployeesAsync(emp.id))}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }
            <ModalFormEmployees
                show={show}
                handleClose={handleClose}
                editMode={editMode}
                editData={editData}
                onSave={handleSaveEdit}
            />
        </>
    );
}
