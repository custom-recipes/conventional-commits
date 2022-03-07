import { RecipeBuilder } from "@blitzjs/installer"
import { join } from "path"

export default RecipeBuilder()
    .setName("Conventional Commits")
    .setDescription("This will install all necessary dependencies and configure Conventional Commits for use.")
    .setOwner("Stefan Kühnel <git@stefankuehnel.com>")
    .setRepoLink("https://github.com/custom-recipes/conventional-commits")
    .addAddDependenciesStep({
        stepId: "addDeps",
        stepName: "Add npm dependencies",
        explanation: "We'll install the commitizen tool itself, as well as CommitLint for linting your commit messages.",
        packages: [
            {
                name: "@commitlint/config-conventional",
                version: "latest",
                isDevDep: true
            },
            {
                name: "@commitlint/cli",
                version: "latest",
                isDevDep: true
            }
        ]
    })
    .addNewFilesStep({
        stepId: "addConfig",
        stepName: "Add configuration files",
        explanation: "Next, we need to add some configuration files!",
        targetDirectory: ".",
        // The 'template' directory replicates the root directory.
        // For example, if the '.github/workflows/ci.yml' file is to be created,
        // it must be located at 'template/.github/workflows/ci.yml'.
        templatePath: join(__dirname, "templates"),
        templateValues: {}
    })
    .addRunCommandStep({
        stepId: "initializeAdapter",
        stepName: "Initialize Conventional Changelog Adapter",
        explanation: "Now we need to initialize the Conventional Changelog Adapter to make the repo commitizen friendly.",
        command: "npx commitizen init cz-conventional-changelog --save-dev --save-exact -y"
    })
    .addRunCommandStep({
        stepId: "createTask",
        stepName: "create npm commit task",
        explanation: "Finally, we need to create the commitizen npm task.",
        command: "npm set-script git:commit cz"
    })
    .build()
