<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep restaurant domain logic in `src/features/restaurant/model.ts` and shared state in its provider so every workspace uses the same validated frontend order lifecycle.
- Persist the frontend workspace in browser storage after hydration, with same-browser tab updates only; there is no backend, real authentication, or cross-device synchronization.
- Use independent TanStack leaf routes for POS, kitchen, history, overview, menu, team, and reports so each workspace can be opened directly and has its own page metadata.
- Keep the shared navigation and provider around the root Outlet so cart and order state survive navigation.
- Define visual roles and reusable application classes in `src/styles.css` and use the shared shadcn Button for controls to keep the workspace consistent.
