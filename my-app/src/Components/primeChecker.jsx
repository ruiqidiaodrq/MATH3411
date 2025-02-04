import { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { 
    Container, Card, CardContent, Typography, TextField, Button, Box 
} from '@mui/material';

class PrimeChecker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            input: '',
            result: '',
        };
    }

    handleSubmit = async () => {
        try {
            // Send the input to FastAPI backend
            const response = await axios.post('http://localhost:8000/prime_checker/', {
                number: this.state.input
            });

            // Set the result in the state after the calculation
            this.setState({ result: response.data.result });
        
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
                            label="Enter an integer"
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
                                Check it
                            </Button>
                        </Box>

                        {this.state.result !== '' && (
                            <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                                {this.state.result ? 'This is a prime.': 'This is a composite.'}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Container>
        );
    }

}

PrimeChecker.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default PrimeChecker;
