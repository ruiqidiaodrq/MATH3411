import React, { Component } from 'react';
import axios from 'axios';
import { 
    Container, Card, CardContent, Typography, TextField, Button, Box 
} from '@mui/material';

class Pseudoprime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            a: '', 
            n: '',
            result_a: '',
            result_n: '',
            indicator: '',
        };
    }

    // Method to handle form submission
    handleSubmit = async () => {
        try {
            // Send the input to FastAPI backend
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/pseudoprime/`, {
                a: this.state.a, 
                n: this.state.n,
            });

            // Set the result in the state after the calculation
            this.setState({ 
                result_a: this.state.a,
                result_n: this.state.n,
                indicator: response.data.result,
            });
        
        } catch (error) {
            console.error('Error encoding message:', error);
        }
    }

    // Handle input changes
    handleAChange = (e) => {
        this.setState({ a: e.target.value });
    }

    handleNChange = (e) => {
        this.setState({ n: e.target.value });
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
                            label="Enter a target integer 'n'"
                            variant="outlined"
                            fullWidth
                            value={this.state.n}
                            onChange={this.handleNChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Enter a base integer 'a'"
                            variant="outlined"
                            fullWidth
                            value={this.state.a}
                            onChange={this.handleAChange}
                            sx={{ mb: 2 }}
                        />

                        <Box display="flex" justifyContent="center">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleSubmit}
                                sx={{ px: 4 }}
                            >
                                Check it
                            </Button>
                        </Box>

                        {this.state.indicator !== '' && (
                            <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                                {this.state.indicator
                                    ? `The number ${this.state.result_n} is a pseudo-prime to base ${this.state.result_a}.`
                                    : `The number ${this.state.result_n} is not a pseudo-prime to base ${this.state.result_a}.`}
                            </Typography>
                        )}

                    </CardContent>
                </Card>
            </Container>
        );
    }

}

export default Pseudoprime;
