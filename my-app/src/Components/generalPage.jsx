import React, { Component } from 'react';
import axios from 'axios';
import { 
    Container, Card, CardContent, Typography, TextField, Button, Box 
} from '@mui/material';

class GeneralPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            input: '',
            result: '',
        };
    }

    // Method to handle form submission
    handleSubmit = async () => {
        try {
            // Send the input to FastAPI backend
            const response = await axios.post('http://localhost:8000/lz78_encoding/', {
                message: this.state.input
            });

            // Set the result in the state after the calculation
            // this.setState({ result: response.data });
            const encodedOutput = response.data.encoded_output.map(item => `(${item[0]}, ${item[1]})`).join(', ');

            this.setState({ result: encodedOutput }); 
        } catch (error) {
            console.error('Error encoding message:', error);
        }
    }

    // Handle input changes
    handleInputChange = (e) => {
        this.setState({ input: e.target.value });
    }

    render() {
        return (
            <Container maxWidth="sm">
                <Card sx={{ mt: 4, p: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {this.state.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {this.state.description}
                        </Typography>
                        
                        <TextField
                            label="Enter text"
                            variant="outlined"
                            fullWidth
                            value={this.state.input}
                            onChange={this.handleInputChange}
                            sx={{ mb: 2 }}
                        />

                        <Box display="flex" justifyContent="center">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleSubmit}
                                sx={{ px: 4 }}
                            >
                                Encode
                            </Button>
                        </Box>

                        {this.state.result && (
                            <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                                Encoded Result: {this.state.result}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Container>
        );
    }

    // render() {
    //     return (
    //         <div>
    //             <h1>{this.state.title}</h1>
    //             <p>{this.state.description}</p>
    //             <input
    //                 type="text"
    //                 value={this.state.input}
    //                 onChange={this.handleInputChange}
    //             />
    //             <br/>
    //             <button onClick={this.handleSubmit}>Calculate</button>
    //             <p>{this.state.result && `Encoded Result: ${this.state.result}`}</p>
    //         </div>
    //     );
    // }
}

export default GeneralPage;
