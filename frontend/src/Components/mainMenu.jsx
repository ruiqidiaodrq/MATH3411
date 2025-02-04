import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid2, Card, CardContent, Box, TextField } from '@mui/material';

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            tools: [
                { path: "/lz78", label: "LZ78 Encoding" },
                { path: "/isbn", label: "ISBN Checker" },
                // { path: "/bch", label: "BCH Coding" },
                { path: "/shan_entp", label: "Shannon Entropy" },
                { path: "/shan_avg", label: "Shannon Average Length" },
                { path: "/kraft_mc", label: "Kraft-McMillan" },
                { path: "/trial_prime", label: "Prime Checker" },
                { path: "/euler", label: "Euler's Totient" },
                { path: "/arith_encode", label: "Arithmetic Encoding" },
                { path: "/pseudoprime", label: "Pseudo-Prime Checker" },
                // { path: "/arith_decode", label: "Arithmetic Decoding" },
            ]
        };
    }

    // Handle search input change
    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value.toLowerCase() });
    };

    render() {
        const { searchQuery, tools } = this.state;

        // filter and sort
        const filteredTools = tools
            .filter(tool => tool.label.toLowerCase().includes(searchQuery))
            .sort((a, b) => a.label.localeCompare(b.label));

        return (
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mt: 5, mb: 3 }}>
                    <Typography variant="h3" gutterBottom>
                        Information, Ciphers and Codes
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Welcome to MATH3411! Wish you can find what you want!
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Start typing the name of the tool that you want to use and Click the button.
                    </Typography>
                </Box>

                {/* Search Bar */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        sx={{ maxWidth: 400 }}
                        onChange={this.handleSearchChange}
                    />
                </Box>

                {/* Display filtered tools */}
                <Grid2 container spacing={3} justifyContent="center">
                    {filteredTools.length > 0 ? (
                        filteredTools.map((item, index) => (
                            <Grid2 item xs={12} sm={4} key={index}>
                                <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component={Link}
                                            to={item.path}
                                            sx={{ width: "100%", py: 2 }}
                                        >
                                            {item.label}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        ))
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No matching results found.
                        </Typography>
                    )}
                </Grid2>
            </Container>
        );
    }
}

export default MainMenu;
