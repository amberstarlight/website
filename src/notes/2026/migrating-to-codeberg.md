This is how I've migrated repositories to Codeberg:

1. Make a new repository on Codeberg

2. Add the remote to `origin` in the existing repository, using:

   ```sh
   git remote set-url origin --add ssh://git@codeberg.org/amberstarlight/repo.git
   ```

   I could have added a different remote name, for example `codeberg`, but as
   I am intending to remove repositories from GitHub in the future this is a
   simple way to make both remotes exactly the same. You could probably script
   this using `basename $(pwd)` or similar.

3. Run `git push` to push the repository - this will push to all `origin`s, the
   original GitHub origin and the new Codeberg origin.

4. Delete the GitHub repository (optional)

I haven't looked into Woodpecker CI at all yet - but I will note here that you
need to [request access][0] to use it.

[0]: https://codeberg.org/Codeberg-e.V./requests#woodpecker-ci
