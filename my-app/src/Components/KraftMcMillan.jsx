import React, { Component } from 'react';
import axios from 'axios';
import { 
    Container, Card, CardContent, Typography, TextField, Button, Box 
} from '@mui/material';

class KraftMcMillan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            radix: '', 
            length: '',
            result: '',
        };
    }

    // Method to handle form submission
    handleSubmit = async () => {
        try {
            // Send the input to FastAPI backend
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/Kraft_McMillan/`, {
                radix: this.state.radix,
                length: this.state.length
            });

            // Set the result in the state after the calculation
            this.setState({ result: response.data.result });
        
        } catch (error) {
            console.error('Error encoding message:', error);
        }
    }

    // Handle input changes
    handleLengthChange = (e) => {
        this.setState({ length: e.target.value });
    }

    handleRadixChange = (e) => {
        this.setState({ radix: e.target.value });
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
                            label="Enter code length e.g. 3, 2, 4, 2, 1"
                            variant="outlined"
                            fullWidth
                            value={this.state.length}
                            onChange={this.handleLengthChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Enter integer radix"
                            variant="outlined"
                            fullWidth
                            value={this.state.radix}
                            onChange={this.handleRadixChange}
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

                        {this.state.result !== '' && (
                            <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                                {this.state.result <= 1
                                    ? `There exists such code as ${this.state.result} <= 1`
                                    : `There does not exist such code as ${this.state.result} > 1`}
                            </Typography>
                        )}

                    </CardContent>
                </Card>
            </Container>
        );
    }

}

export default KraftMcMillan;
