document.addEventListener('DOMContentLoaded', function () {

    const inputData = document.getElementById('username');
    const searchBtn = document.getElementById('Search-btn');

    const stateContainer = document.querySelector('.states-container');
    const easyProgress = document.querySelector('.easy-container');
    const mediumProgress = document.querySelector('.medium-container');
    const hardProgress = document.querySelector('.hard-container');

    const easyLabel = document.getElementById('easy-label');
    const mediumLabel = document.getElementById('medium-label');
    const hardLabel = document.getElementById('hard-label');

    function validusername(userName) {
        if (userName.trim() === "") {
            alert("username is empty !!!");
            return false;
        }

        const regex = /^[a-zA-Z0-9_-]{3,30}$/;
        const isMatching = regex.test(userName);

        if (!isMatching) {
            alert("invalid username");
        }

        return isMatching;
    }


    async function fetchUserDetails(userName) {
    try {
        searchBtn.textContent = "Searching...";
        searchBtn.disabled = true;

        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${userName}/solved`);

        if (!response.ok) {
            throw new Error("Unable to fetch user data");
        }

        const data = await response.json();
        console.log("Data:", data);

        if (!data || data.errors) {
            stateContainer.innerHTML = '<p>User Not Found</p>';
            return;
        }

        displayuserdata(data);

        const easy   = data.easySolved   || 0;
        const medium = data.mediumSolved  || 0;
        const hard   = data.hardSolved    || 0;

        const totalEasy   = data.totalEasy   || 1;
        const totalMedium = data.totalMedium || 1;
        const totalHard   = data.totalHard   || 1;

        // Update labels
        easyLabel.textContent   = easy;
        mediumLabel.textContent = medium;
        hardLabel.textContent   = hard;

        // Update progress bars
        const easyPercent   = (easy / totalEasy) * 100;
        const mediumPercent = (medium / totalMedium) * 100;
        const hardPercent   = (hard / totalHard) * 100;

        easyProgress.style.setProperty('--progress-degree',   `${easyPercent}%`);
        mediumProgress.style.setProperty('--progress-degree', `${mediumPercent}%`);
        hardProgress.style.setProperty('--progress-degree',   `${hardPercent}%`);

    } catch (error) {
        stateContainer.innerHTML = '<p>User Not Found</p>';
        console.error(error);
    } finally {
        searchBtn.textContent = "Search";
        searchBtn.disabled = false;
    }
    }

    function displayuserdata(data){
        
    }

    searchBtn.addEventListener('click', function () {
        const userName = inputData.value;

        if (validusername(userName)) {
            fetchUserDetails(userName);
        }
    });

});

