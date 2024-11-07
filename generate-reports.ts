
const { exec } = require('child_process');

exec('allure generate allure-results --clean -o allure-report', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error generating report: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log('Allure report generated successfully.');
});
