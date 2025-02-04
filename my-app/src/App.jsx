import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from '@/Components/mainMenu';
import LZ78Encoding from '@/Components/LZ78Encoding';
import ISBNChecker from '@/Components/ISBNChecker';
import ShannonEntropy from '@/Components/shannonEntropy';
import ShannonAverage from '@/Components/shannonAverage';
import KraftMcMillan from '@/Components/KraftMcMillan';
import PrimeChecker from '@/Components/primeChecker';
import EulerTotient from '@/Components/EulerTotient';
import ArithmeticEncoding from '@/Components/arithmeticEncoding';
import Pseudoprime from '@/Components/pseudoprime';
import NotFound from '@/Components/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />

          <Route
            path="/lz78"
            element={
              <LZ78Encoding
                title="LZ78 Encoding"
                description="Enter a string and I will encode it in LZ78 style for you."
              />
            }
          />
          <Route
            path="/isbn"
            element={
              <ISBNChecker
                title="ISBN Checker"
                description="Enter a 10-digit ISBN number separated by commas and I will check it for you. If it ends with an X, please enter 10 instead."
              />
            }
          />
          <Route
            path="/shan_entp"
            element={
              <ShannonEntropy
                title="Shannon Entropy"
                description="Enter code probability and radix below. I will calculate Shannon Entropy for you."
              />
            }
          />
          <Route
            path="/shan_avg"
            element={
              <ShannonAverage
                title="Shannon Average Length"
                description="Enter code probability and radix below. I will calculate Shannon average length for you."
              />
            }
          />
          <Route
            path="/kraft_mc"
            element={
              <KraftMcMillan
                title="Kraft-McMillan"
                description="Enter code length and radix below. I will check if there exists such uniquely decodable code for you."
              />
            }
          />
          <Route
            path="/trial_prime"
            element={
              <PrimeChecker
                title="Prime Checker"
                description="Enter an integer and I will check if this is a prime for you."
              />
            }
          />
          <Route
            path="/euler"
            element={
              <EulerTotient
                title="Euler's Totient"
                description="Enter an integer n and I will count how many integers up to n that are relatively prime to n for you."
              />
            }
          />
          <Route
            path="/arith_encode"
            element={
              <ArithmeticEncoding
                title="Arithmetic Encoding"
                description="Enter source position (start from 1 in order) and code probability. I will encode it in Arithmetic style for you."
              />
            }
          />
          <Route
            path="/pseudoprime"
            element={
              <Pseudoprime
                title="Pseudo-Prime Checker"
                description="Enter an integer 'n' and an integer 'a'. I will check it if 'n' is a pseudo-prime base to 'a' for you."
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;