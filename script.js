document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.querySelector("nav ul");

  mobileMenuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("show");
    // Toggle between hamburger and close icon
    if (navMenu.classList.contains("show")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove("show");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
    });
  });

  // Load property data
  const properties = [
    {
      id: 1,
      title: "Luxury Villa with Ocean View",
      address: "123 Coastal Drive, Malibu, CA",
      price: 2500000,
      beds: 5,
      baths: 4,
      sqft: 3500,
      type: "house",
      image: "./images/luxury-coastal-villa-with-panoramic-ocean-view.jpg",
    },
    {
      id: 2,
      title: "Modern Downtown Apartment",
      address: "456 Urban Ave, New York, NY",
      price: 850000,
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "apartment",
      image: "./images/centennial-place-atlanta-ga-building-photo.jpg",
    },
    {
      id: 3,
      title: "Charming Suburban Home",
      address: "789 Maple Street, Austin, TX",
      price: 450000,
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: "house",
      image:
        "./images/charming-suburban-homes-nestled-picturesque-community.jpg",
    },
    {
      id: 4,
      title: "Waterfront Condo",
      address: "101 Bayview Lane, Miami, FL",
      price: 1200000,
      beds: 3,
      baths: 3,
      sqft: 2200,
      type: "condo",
      image: "./images/waterfront condo.jpg",
    },
    {
      id: 5,
      title: "Cozy Townhouse",
      address: "202 Park Place, Chicago, IL",
      price: 375000,
      beds: 2,
      baths: 2,
      sqft: 1600,
      type: "townhouse",
      image: "./images/cozy townhouse.jpeg",
    },
    {
      id: 6,
      title: "Rural Farmhouse",
      address: "303 Country Road, Nashville, TN",
      price: 550000,
      beds: 4,
      baths: 3,
      sqft: 2800,
      type: "house",
      image: "./images/rural-farmhouse.jpg",
    },
  ];

  // Display properties
  const propertyGrid = document.getElementById("property-grid");

  function displayProperties(propertiesToDisplay) {
    propertyGrid.innerHTML = "";

    propertiesToDisplay.forEach((property) => {
      const propertyCard = document.createElement("div");
      propertyCard.className = "property-card";

      propertyCard.innerHTML = `
                <div class="property-img">
                    <img src="${property.image}" alt="${property.title}">
                </div>
                <div class="property-info">
                    <h3>${property.title}</h3>
                    <p>${property.address}</p>
                    <div class="property-price">$${property.price.toLocaleString()}</div>
                    <div class="property-features">
                        <span><i class="fas fa-bed"></i> ${
                          property.beds
                        } Beds</span>
                        <span><i class="fas fa-bath"></i> ${
                          property.baths
                        } Baths</span>
                        <span><i class="fas fa-ruler-combined"></i> ${
                          property.sqft
                        } sqft</span>
                    </div>
                    <button class="btn" onclick="viewProperty(${
                      property.id
                    })">View Details</button>
                </div>
            `;

      propertyGrid.appendChild(propertyCard);
    });
  }

  // Initial display of all properties
  displayProperties(properties);

  // Property search functionality
  const searchForm = document.getElementById("property-search");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const location = document.getElementById("location").value.toLowerCase();
    const propertyType = document.getElementById("property-type").value;
    const bedrooms = document.getElementById("bedrooms").value;
    const minPrice = document.getElementById("min-price").value;
    const maxPrice = document.getElementById("max-price").value;
    const keywords = document.getElementById("keywords").value.toLowerCase();

    const filteredProperties = properties.filter((property) => {
      // Location filter
      if (location && !property.address.toLowerCase().includes(location)) {
        return false;
      }

      // Property type filter
      if (propertyType && property.type !== propertyType) {
        return false;
      }

      // Bedrooms filter
      if (bedrooms && property.beds < parseInt(bedrooms)) {
        return false;
      }

      // Price range filter
      if (minPrice && property.price < parseInt(minPrice)) {
        return false;
      }

      if (maxPrice && property.price > parseInt(maxPrice)) {
        return false;
      }

      // Keywords filter
      if (keywords) {
        const keywordList = keywords.split(",");
        const propertyText =
          `${property.title} ${property.address}`.toLowerCase();

        for (let keyword of keywordList) {
          keyword = keyword.trim();
          if (keyword && !propertyText.includes(keyword)) {
            return false;
          }
        }
      }

      return true;
    });

    displayProperties(filteredProperties);
  });

  // Virtual tour functionality
  const tourThumbs = document.querySelectorAll(".tour-thumb");
  const tourViewer = document.getElementById("tour-viewer");

  // Sample tour data (in a real app, these would be actual 360° tour iframes)
  const tours = {
    1: '<div class="tour-active"><h3>Luxury Villa Virtual Tour</h3><p>Explore this stunning 5-bedroom villa with panoramic ocean views. Use your mouse to navigate through the property.</p><div class="tour-preview" style="background: url(https://source.unsplash.com/random/800x600?luxury-interior) center/cover; height: 100%;"></div></div>',
    2: '<div class="tour-active"><h3>Modern Apartment Virtual Tour</h3><p>Take a virtual walkthrough of this sleek downtown apartment with floor-to-ceiling windows.</p><div class="tour-preview" style="background: url(https://source.unsplash.com/random/800x600?modern-interior) center/cover; height: 100%;"></div></div>',
    3: '<div class="tour-active"><h3>Suburban Home Virtual Tour</h3><p>Experience the charm of this spacious suburban home with a large backyard.</p><div class="tour-preview" style="background: url(https://source.unsplash.com/random/800x600?suburban-interior) center/cover; height: 100%;"></div></div>',
  };

  tourThumbs.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      const tourId = this.getAttribute("data-tour");

      // Update active thumbnail
      tourThumbs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Load tour
      tourViewer.innerHTML =
        tours[tourId] ||
        '<div class="tour-placeholder"><i class="fas fa-home"></i><p>Tour not available</p></div>';
    });
  });

  // Mortgage calculator functionality
  const mortgageForm = document.getElementById("mortgage-form");
  const monthlyPaymentEl = document.getElementById("monthly-payment");
  const loanAmountEl = document.getElementById("loan-amount");
  const totalInterestEl = document.getElementById("total-interest");
  const totalCostEl = document.getElementById("total-cost");

  function calculateMortgage() {
    const homePrice =
      parseFloat(document.getElementById("home-price").value) || 0;
    const downPayment =
      parseFloat(document.getElementById("down-payment").value) || 0;
    const loanTerm = parseInt(document.getElementById("loan-term").value) || 30;
    const interestRate =
      parseFloat(document.getElementById("interest-rate").value) || 3.5;

    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm * 12;

    // Calculate monthly payment
    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, payments))) /
      (Math.pow(1 + monthlyRate, payments) - 1);

    // Calculate total interest and total cost
    const totalInterest = monthlyPayment * payments - loanAmount;
    const totalCost = loanAmount + totalInterest;

    // Update UI
    loanAmountEl.textContent = `$${loanAmount.toFixed(2)}`;
    monthlyPaymentEl.textContent = `$${monthlyPayment.toFixed(2)}`;
    totalInterestEl.textContent = `$${totalInterest.toFixed(2)}`;
    totalCostEl.textContent = `$${totalCost.toFixed(2)}`;
  }

  mortgageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    calculateMortgage();
  });

  // Calculate on input change
  const calculatorInputs = document.querySelectorAll(
    "#mortgage-form input, #mortgage-form select"
  );
  calculatorInputs.forEach((input) => {
    input.addEventListener("change", calculateMortgage);
    input.addEventListener("keyup", calculateMortgage);
  });

  // Initial calculation
  calculateMortgage();
});
