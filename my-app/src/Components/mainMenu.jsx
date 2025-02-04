import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardContent, Box, TextField } from '@mui/material';

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            tools: [
                { path: "/lz78", label: "LZ78 Encoding" },
                { path: "/isbn", label: "ISBN Checker" },
                { path: "/shan_entp", label: "Shannon Entropy" },
                { path: "/shan_avg", label: "Shannon Average Length" },
                { path: "/kraft_mc", label: "Kraft-McMillan" },
                { path: "/trial_prime", label: "Prime Checker" },
                { path: "/euler", label: "Euler's Totient" },
                { path: "/arith_encode", label: "Arithmetic Encoding" },
                { path: "/pseudoprime", label: "Pseudo-Prime Checker" },
            ]
        };
    }

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
                <Box sx={{ textAlign: 'center', mt: 5, mb: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#333' }} gutterBottom>
                        Information, Ciphers and Codes
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                        Discover a collection of tools to explore ciphers, codes, and more!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: '#555' }}>
                        Start typing the name of the tool you want to use and click the button to explore.
                    </Typography>
                </Box>

                {/* Search Bar */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                    <TextField
                        label="Search Here"
                        variant="standard"
                        fullWidth
                        sx={{
                            maxWidth: 800,
                        }}
                        onChange={this.handleSearchChange}
                    />
                </Box>

                {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                    <TextField id="filled-basic" label="Filled" variant="filled" 
                        fullWidth
                        sx={{
                            maxWidth: 800,
                            backgroundColor: 'white',
                            borderRadius: 3,
                            // boxShadow: 5,
                        }}
                        onChange={this.handleSearchChange}
                    />
                </Box> */}

                {/* Display filtered tools */}
                <Grid container spacing={3} justifyContent="center">
                    {filteredTools.length > 0 ? (
                        filteredTools.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{
                                    boxShadow: 2,
                                    borderRadius: 2,
                                    transition: '0.3s ease',
                                    '&:hover': { 
                                        boxShadow: 5,
                                        backgroundColor: "darkblue",
                                    },
                                    
                                }}>
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component={Link}
                                            to={item.path}
                                            sx={{
                                                width: "100%",
                                                py: 2,
                                                fontSize: "1.1rem",
                                                textTransform: 'none',
                                                letterSpacing: 1,
                                                '&:hover': { 
                                                    boxShadow: 5,
                                                    color: "white",
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
                            No matching results found. Try other tools.
                        </Typography>
                    )}
                </Grid>
            </Container>
        );
    }
}

export default MainMenu;
