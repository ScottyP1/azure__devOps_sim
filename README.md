# azure__devOps_sim

A sandboxed **Azure DevOps** you drive from a terminal — built to learn the delivery process, not to ship anything.

Type real `git` and `az` commands at the bottom of the screen and watch the service above react: push a file and see it land in the repo, open a pull request and watch build validation gate it, then take a build through to a production approval.

Open `index.html` in a browser. No build step, no install, no account.

## Why

Learning Azure DevOps for real means waiting days for a hosted-parallelism grant before your first pipeline can run. This teaches the *shape* of the process — org → project → repo, branch policies, PRs, CI, artifacts, approval gates — so the real product is familiar on day one.

It is **not** a replacement for the real thing. It won't teach you YAML against a real agent, real service-connection auth, or real failure modes.

## What's in it

Roughly 40 screens across the product's actual navigation:

| Area | Screens |
| --- | --- |
| Organization | Projects, Users, Billing, Auditing, Extensions, Tokens & SSH |
| Overview | Summary, Dashboards, Wiki |
| Boards | Work items, Board, Backlogs, Sprints, Queries, Delivery Plans, Traceability |
| Repos | Repositories, Files, Commits, Pushes, Branches, Tags, Pull requests, Forks, Advanced Security, Code search |
| Pipelines | Runs, Environments, Releases, Library, Task groups, Agent pools |
| Test Plans | Test plans, Runs |
| Artifacts | Feeds |
| Project settings | Settings, Service hooks |

Four repositories, each with its own git state and real file contents:

- `taskapi` — Spring Boot API (Java 21, Boot 4.1.1)
- `taskapi-web` — React front end
- `taskapi-infra` — Bicep templates
- `shared-java-libs` — library published to the Artifacts feed

## The circuit

The panel on the right tracks one change through its whole life and unlocks each phase as you finish it. In the terminal:

```
git status
edit src/main/java/com/cody/taskapi/web/TaskController.java
git add .
git commit -m "Add tasks endpoint"
git push                              # rejected: TF402455, branch policy
git checkout -b feature/tasks-endpoint
git push -u origin feature/tasks-endpoint
az repos pr create --title "Add tasks endpoint" --work-item 42
```

Then approve and complete the PR in the UI, and:

```
az pipelines run --cd                 # dev deploys itself; prod waits for a human
```

That pause on `prod` is a Change Advisory Board compressed into one button and an audit record.

`help` lists every command. `reset` starts the circuit over.

## Built with

One HTML file. React 18 + htm from CDN, no build step, no dependencies to install.
