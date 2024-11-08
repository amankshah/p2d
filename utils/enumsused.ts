enum dependencies {
    Just_me= "Just me",
    Me_and_my_kids="Me and my kids",
    Me_and_my_partner="Me and my partner",
    Me_my_partner_and_my_kids= "Me, my partner, and my kids"
  };

  enum gender {
    Male= "Male",
    Female="Female",
    Prefer_not_to_identify="Prefer not to identify",
  };

  enum monthlyExpenses{
    $2000= "$2,000",
    $4000="$4,000",
    $6000="$6,000",
    $8000="$8,000",
    $10000_or_more="$10,000 (or more)"
  }

  enum mortgageAmount{
    less_than_$100000="Less than $100,000",
    $100000_$200000="$100,000 - $200,000",
    $200001_$300000="$200,001 - $300,000",
    $300001_$400000="$300,001 - $400,000",
    $400001_$500000="$400,001 - $500,000",
    $500001_$600000="$500,001 - $600,000",
    $600001_$700000="$600,001 - $700,000",
    $700001_$800000="$700,001 - $800,000",
    $800001_$900000="$800,001 - $900,000",
    $900001_$1000000="$900,001 - $1,000,000",
    more_than_$1000000="More than $1,000,000",
  }

  enum debt{
    less_than_$50000="Less than $50,000",
    $50001_$100000="$50,001 - $100,000",
    $100001_$200000="$100,001 - $200,000",
    $200001_$300000="$200,001 - $300,000",
    $300001_$400000="$300,001 - $400,000",
    $400001_$500000="$400,001 - $500,000",
    more_than_$500000="More than $500,000",
  }

  enum assets{
    less_than_$50000="Less than $50,000",
    $50001_$100000="$50,001 - $100,000",
    $100001_$200000="$100,001 - $200,000",
    $200001_$300000="$200,001 - $300,000",
    $300001_$400000="$300,001 - $400,000",
    $400001_$500000="$400,001 - $500,000",
    $500001_$600000="$500,001 - $600,000",
    $600001_$700000="$600,001 - $700,000",
    $700001_$800000="$700,001 - $800,000",
    $800001_$900000="$800,001 - $900,000",
    $900001_$1000000="$900,001 - $1,000,000",
    more_than_$1000000="More than $1,000,000",
  }

  export {dependencies, gender, monthlyExpenses, mortgageAmount, debt, assets};