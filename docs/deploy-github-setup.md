## GitHub — PAT com scope `workflow`

O PAT em `github-pat.txt` **não tem** scope `workflow`. Push de `.github/workflows/deploy.yml` falha até regenerar o token com:

- `repo`
- `workflow`

Revogar o antigo em GitHub → Settings → Developer settings → PAT.

Depois:

```powershell
git push origin main
```

## GitHub Secrets (após push do workflow)

```powershell
$pat = Get-Content C:\repo\financeiro\planos\vps-secrets\github-pat.txt | Where-Object { $_ -match '^ghp_' }
$pat | gh auth login --with-token

gh secret set VPS_HOST --repo farukzahra/astro --body "66.23.231.218"
gh secret set VPS_USER --repo farukzahra/astro --body "root"
gh secret set VPS_PORT --repo farukzahra/astro --body "22"
gh secret set DEPLOY_PATH --repo farukzahra/astro --body "/opt/tech-blog"
Get-Content C:\repo\financeiro\planos\vps-secrets\deploy_key -Raw | gh secret set VPS_SSH_KEY --repo farukzahra/astro
```

Variable opcional: `WEB_PORT=8085`
