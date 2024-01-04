useEffect(() => {
  if (weight && heightInM) {
    const bmi = weight / (heightInM * heightInM);
    setBmi(bmi.toFixed(2));
  }
  if (weight && heightInCm && age) {
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + 13.397 * weight + 4.799 * heightInCm - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * heightInCm - 4.33 * age;
    }
    setBmr(bmr.toFixed(2));
  }
  if (waist && neck && heightInCm) {
    const bodyFat =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(heightInCm)) -
      450;
    setBodyFat(bodyFat.toFixed(2));
  }
}, [weight, waist, neck, arms]);

const heightInCm = userDetails.height;
const heightInM = heightInCm / 100;
const age = userDetails.age;
const gender = userDetails.gender;


const [arms, setArms] = useState(null);
const [bmi, setBmi] = useState(null);
const [bmr, setBmr] = useState(null);
const [bodyFat, setBodyFat] = useState(null);