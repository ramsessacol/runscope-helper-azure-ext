import * as tl from 'azure-pipelines-task-lib/task';

const runscopeRequirements: string = "https://gist.githubusercontent.com/ThiagoBarradas/c7c5e83f089108fdd3fad9f165f5aaa0/raw";
const runscopeAppPython: string  = "https://gist.githubusercontent.com/ramsessacol/3ee9bbd2009230630cf3ba8c32f83bb9/raw/2cc2da622da3ffab2340c1db29a6364e2987a902";

async function run() {
    try {
        // get inputs
        var triggerUrl: string = tl.getInput('triggerUrl', true);
        var accessToken: string = tl.getInput('accessToken', true);

        // install tools
        await tl.exec('pip', ["install", "-r", runscopeRequirements]);
        await tl.exec('wget', ["-O", "app.py", runscopeAppPython]);
        
        // execute integration tests
        await tl.exec('python', ["app.py", triggerUrl, accessToken]);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();