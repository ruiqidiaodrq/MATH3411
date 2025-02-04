// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import GeneralPage from './Components/generalPage';
// import MainMenu from '../../my-app/Components/mainMenu';
// import LZ78Encoding from '../../my-app/Components/LZ78Encoding';
// import ISBNChecker from '../../my-app/Components/ISBNChecker';
// import ShannonEntropy from '../../my-app/Components/shannonEntropy';
// import ShannonAverage from '../../my-app/Components/shannonAverage';
// import KraftMcMillan from '../../my-app/Components/KraftMcMillan';
// import PrimeChecker from '../../my-app/Components/primeChecker';
// import EulerTotient from '../../my-app/Components/EulerTotient';
// import ArithmeticEncoding from '../../my-app/Components/arithmeticEncoding';
// import Pseudoprime from '../../my-app/Components/pseudoprime';
// // import ArithmeticDecoding from './Components/arithmeticDecoding';

// const NotFound = () => (
//   <div>
//       <h2>404 - Page Not Found</h2>
//       <p>The page you're looking for doesn't exist.</p>
//   </div>
// );

// function App() {
//     return (
//         <div>
//           <Router>
//               <Routes>
//                   <Route exact path="/" element={<MainMenu/>} />
//                   <Route path="/lz78" element={<LZ78Encoding title='LZ78 Encoding' description='Enter a string and I will encode it in LZ78 style for you.'/>} />
//                   <Route path="/isbn" element={<ISBNChecker title='ISBN Checker' description='Enter a 10-digit ISBN number separated by commas and I will check it for you. If it ends with an X, please enter 10 instead.'/>} />
//                   {/* <Route path="/bch" element={<GeneralPage title='BCH Coding' description='Provide me information about BCH'/>} /> */}
//                   <Route path="/shan_entp" element={<ShannonEntropy title='Shannon Entropy' description='Enter code probability and radix below. I will calculate Shannon Entropy for you.'/>} />
//                   <Route path="/shan_avg" element={<ShannonAverage title='Shannon Average Length' description='Enter code probability and radix below. I will calculate Shannon average length for you.'/>} />
//                   <Route path="/kraft_mc" element={<KraftMcMillan title='Kraft-McMillan' description='Enter code length and radix below. I will check if there exists such uniquely decodable code for you.'/>} />
//                   <Route path="/trial_prime" element={<PrimeChecker title='Prime Checker' description='Enter an integer and I will check if this is a prime for you.'/>} />
//                   <Route path="/euler" element={<EulerTotient title="Euler's Totient" description='Enter an integer n and I will count how many integers up to n that are relatively prime to n for you.'/>} />
//                   <Route path="/arith_encode" element={<ArithmeticEncoding title="Arithmetic Encoding" description='Enter source position (start from 1 in order) and code probability. I will encode it in Arithmetic style for you.'/>} />
//                   <Route path="/pseudoprime" element={<Pseudoprime title="Pseudo-Prime Checker" description="Enter an integer 'n' and an integer 'a'. I will check it if 'n' is a pseudo-prime base to 'a' for you."/>} />
//                   {/* <Route path="/arith_decode" element={<ArithmeticDecoding title="Arithmetic Decoding" description='Enter source symbol in order, code probability and encoded message. I will decode for you.'/>} /> */}
//                   <Route path="*" element={<NotFound />} />
//               </Routes>
//           </Router>
//         </div>
//     );
// }

// export default App;

