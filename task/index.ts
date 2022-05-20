import * as tl from 'azure-pipelines-task-lib/task';

const runscopeRequirements: string = "https://gist.githubusercontent.com/ramsessacol/37132d91eeb93a32e1067617c34bf98b/raw";
const runscopeAppPython: string  = "https://gist.githubusercontent.com/ramsessacol/3ee9bbd2009230630cf3ba8c32f83bb9/raw/2cc2da622da3ffab2340c1db29a6364e2987a902";

async function run() {
    try {
        // get inputs
        var triggerUrl: string = tl.getInput('triggerUrl', true);
        var accessToken: string = tl.getInput('accessToken', true);

        // install tools
        await tl.exec('pip3', ["install", "-r", runscopeRequirements]);
        await tl.exec('wget', ["-O", "app.py", runscopeAppPython]);

        let result = tl.TaskResult.Succeeded;
        
        // execute integration tests
        await tl.exec('python3', ["app.py", triggerUrl, accessToken]);
        await tl.setResult(result, null, true);
    }
    catch (err) {
        tl.error(err.message);
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();