import { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { 
    Container, Card, CardContent, Typography, TextField, Button, Box 
} from '@mui/material';

class ArithmeticEncoding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            src: '', 
            prob: '',
            start: '',
            end: '',
            width: '',
        };
    }

    // Method to handle form submission
    handleSubmit = async () => {
        try {
            // Send the input to FastAPI backend
            const response = await axios.post('http://localhost:8000/arithmetic_encoding/', {
                src: this.state.src, 
                prob: this.state.prob,
            });

            // Set the result in the state after the calculation
            this.setState({
                start: response.data.start,
                end: response.data.end,
                width: response.data.width,
            });
        
        } catch (error) {
            console.error('Error encoding message:', error);
        }
    }

    // Handle input changes
    handleSrcChange = (e) => {
        this.setState({ src: e.target.value });
    }

    handleProbChange = (e) => {
        this.setState({ prob: e.target.value });
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
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            For example, for a code system a, b, c, d, e with and corresponding code probability 0.1, 0.2, 0.3, 0.2, 0.2 and position 1, 2, 3, 4, 5.
                            If we want to encode the word &apos;bad&apos;, Enter 2,1,4 in source position and 0.1, 0.2, 0.3, 0.2, 0.2 in code probability.
                            The encoded interval is (0.112, 0.116) with a width 0.004.
                        </Typography>
                        
                        <TextField
                            label="Enter source position e.g. 2, 1, 4"
                            variant="outlined"
                            fullWidth
                            value={this.state.src}
                            onChange={this.handleSrcChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Enter code probability e.g. 0.1, 0.2, 0.3, 0.2, 0.2"
                            variant="outlined"
                            fullWidth
                            value={this.state.prob}
                            onChange={this.handleProbChange}
                            sx={{ mb: 2 }}
                        />

                        <Box display="flex" justifyContent="center">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleSubmit}
                                sx={{ px: 4 }}
                            >
                                Calculate
                            </Button>
                        </Box>

                        {this.state.start !== '' && (
                            <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                                {/* The encoded interval is ({this.state.start}, {this.state.end}) with a width {this.state.width}. */}
                                The encoded interval is ({this.state.start}, {this.state.end}) and suggested encoded message is {this.state.width}.
                            </Typography>
                        )}

                    </CardContent>
                </Card>
            </Container>
        );
    }

}

ArithmeticEncoding.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ArithmeticEncoding;
