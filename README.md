# azure__devOps_sim

### ▶ [Try it live](https://scottyp1.github.io/azure__devOps_sim/)

A sandboxed **Azure DevOps** you drive from a terminal — built to learn the delivery process, not to ship anything.

The screen is the **server**. The terminal at the bottom is **your laptop**. Type real `git` and `az` commands and watch code cross between them: edit a file and see it land in the repo, get your push refused by a branch policy, open a pull request, have a teammate review it overnight, and take a build through to a production approval gate.

It asks your name on first load and uses it throughout — commits, reviews, approvals and the audit trail are yours. Everything is stored in your own browser; nothing is sent anywhere.

No install, no build step, no Azure account. Opening `index.html` locally works too.

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

## The guided tour

The panel on the right is a 17-step tour. Each step names the tab, tells you what you'll see and why it matters, and gives you a **Take me there** button so there's no hunting. Steps that require an action won't let you press Next until you've done it.

Six steps of looking around — the two halves, repositories, files, branch policies, boards, and the machines and secrets — then eleven that walk one change from ticket to production.

## The circuit

If you'd rather drive it yourself, this is the whole loop. In the terminal:

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

One HTML file. React 18 + htm from a CDN, no build step, no dependencies to install.

`build.js` wraps the source fragment into a standalone document. It reads and writes UTF-8
explicitly — doing that step with PowerShell's `Get-Content`/`Set-Content` round-trips through
the ANSI code page and silently double-encodes every non-ASCII character, so the build fails
loudly if it detects that damage rather than shipping it.

```
node build.js <path-to-fragment>
```
