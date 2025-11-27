# CLAUDE.md - AI Assistant Guidelines for Claude Code

This document provides context and guidelines for AI assistants working with the Claude Code codebase. Claude Code is Anthropic's agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster through natural language commands.

## Project Overview

**Claude Code** is a Node.js-based CLI application with:
- Interactive and headless (print) modes
- Multi-provider AI model support (Anthropic, AWS Bedrock, Google Vertex AI)
- Extensible tool system with file operations, web access, and MCP integration
- Plugin architecture for custom workflows
- Hook system for event-driven automation

### Technology Stack
- **Shell**: 46.4% (installation scripts, automation)
- **Python**: 33.8% (plugins, hooks, examples)
- **TypeScript**: 12.9% (core application logic)
- **PowerShell**: 4.7% (Windows support)
- **Dockerfile**: 2.2% (containerization)

**Requirements**: Node.js 18+

## Directory Structure

### User Configuration (`~/.claude/`)
```
~/.claude/
├── settings.json           # User-level configuration
├── settings.local.json     # Local overrides (not synced)
├── CLAUDE.md               # Global instructions for all sessions
├── shell-snapshot          # Bash environment state
├── agents/                 # Custom agent definitions
├── commands/               # Custom slash commands
├── output_styles/          # Response formatting templates
├── hooks/                  # Event-driven extensions
└── sessions/               # Conversation transcripts (SQLite)
```

### Project Configuration (`.claude/`)
```
.claude/
├── settings.json           # Project-specific rules (version controlled)
├── settings.local.json     # Local project overrides (gitignored)
├── commands/               # Project slash commands
└── agents/                 # Project-specific agents
```

### Root Level Files
```
.mcp.json                   # MCP server configuration (version controlled)
CLAUDE.md                   # Project instructions for AI assistants
CLAUDE.local.md             # Personal instructions (gitignored)
```

### Plugin Structure
```
plugins/
├── plugin-name/
│   ├── .claude-plugin/
│   │   └── plugin.json     # Plugin metadata
│   ├── commands/           # Slash commands
│   ├── agents/             # Specialized agents
│   ├── skills/             # Agent Skills
│   ├── hooks/              # Event handlers
│   ├── .mcp.json           # Tool configuration
│   └── README.md
```

## Configuration Files

### settings.json Structure
```json
{
  "permissions": {
    "allow": ["Read(*)", "Write(src/**/*.ts)"],
    "deny": ["Bash(rm -rf *)"]
  },
  "allowedTools": ["Bash(npm:*)", "Read(src/**/*.ts)"],
  "disallowedTools": [],
  "permissionMode": "ask",
  "hooks": {
    "PreToolUse": [...],
    "PostToolUse": [...]
  }
}
```

### .mcp.json Structure
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-name"],
      "env": {}
    }
  }
}
```

## Hooks System

### Available Hook Events
| Event | Description | Use Case |
|-------|-------------|----------|
| `SessionStart` | Session begins | Setup, initialization |
| `SessionEnd` | Session ends | Cleanup, logging |
| `UserPromptSubmit` | User sends message | Input validation |
| `PreToolUse` | Before tool execution | Permission checks, validation |
| `PostToolUse` | After tool execution | Formatting, quality gates |
| `PreCompact` | Before context compression | Memory preservation |
| `Stop` | Claude stops responding | Final actions |
| `PermissionRequest` | Tool requests permission | Auto-approve/deny |

### Hook Configuration Example
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write \"$CLAUDE_FILE_PATHS\""
          }
        ]
      }
    ]
  }
}
```

### Exit Codes for Hooks
- `0` - Success, continue normally
- `1` - Error, show error message
- `2` - Block, prevent the action

## Development Workflows

### 1. Explore → Plan → Code → Commit
Best for complex problems:
1. Read relevant files without coding
2. Request detailed plan (use "think" for extended thinking)
3. Implement based on approved plan
4. Commit with context-aware messages

### 2. Test-Driven Development
For verifiable changes:
1. Write tests first with expected inputs/outputs
2. Confirm tests fail (no implementation)
3. Commit tests
4. Implement code to pass tests
5. Commit working code

### 3. Visual Iteration
For UI/design work:
1. Provide screenshots or design mocks
2. Implement and take screenshots
3. Iterate 2-3 times
4. Commit final version

## Key Commands

### CLI Commands
```bash
claude                      # Start interactive session
claude -p "<prompt>"        # Headless mode for automation
claude --continue           # Resume last session
claude --resume             # Select from session history
claude --mcp-debug          # Debug MCP configuration
```

### Slash Commands
```
/help                       # Show available commands
/init                       # Generate CLAUDE.md for project
/permissions                # Manage tool permissions
/vim                        # Toggle vim mode
/clear                      # Clear conversation context
/compact                    # Manually compress context
/export                     # Export conversation
/bug                        # Report a bug
```

### Memory Commands
- `#` prefix - Add persistent notes across sessions
- Tab completion - Reference files and folders

## Available Plugins

| Plugin | Purpose |
|--------|---------|
| `agent-sdk-dev` | Setup Agent SDK projects |
| `code-review` | Automated PR review with parallel agents |
| `commit-commands` | Streamlined git operations |
| `feature-dev` | Seven-phase structured feature development |
| `frontend-design` | Distinctive interface design guidance |
| `hookify` | Custom hook creation |
| `plugin-dev` | Eight-phase plugin building toolkit |
| `pr-review-toolkit` | Six specialized review agents |
| `security-guidance` | Monitor security patterns |

## Best Practices for AI Assistants

### Code Quality
- Follow existing code patterns and conventions
- Use TypeScript for type safety in core code
- Write tests for new functionality
- Keep changes focused and minimal

### File Operations
- Always read files before editing
- Use Edit tool for small changes, Write for new files
- Respect `.gitignore` patterns
- Never modify sensitive files (.env, credentials)

### Git Workflow
- Make atomic commits with clear messages
- Don't push unless explicitly requested
- Check `git status` before committing
- Use conventional commit format when appropriate

### Context Management
- Use `/clear` between unrelated tasks
- Reference specific files with tab completion
- Keep CLAUDE.md updated with discovered patterns
- Use `#` to preserve important context

### Security
- Never expose API keys or secrets
- Validate user input at system boundaries
- Check for OWASP top 10 vulnerabilities
- Use sandbox mode for untrusted operations

## Configuration Hierarchy

Settings cascade with this precedence (highest to lowest):
1. CLI flags and environment variables
2. Session overrides (`localSettings.json`)
3. Project settings (`.claude/settings.json`)
4. User settings (`~/.claude/settings.json`)
5. Enterprise policies (if applicable)

Arrays are merged; specific settings override broader ones.

## Troubleshooting

### MCP Issues
- Use `--mcp-debug` flag to identify problems
- Ensure servers are in root `.mcp.json`, not `.claude/.mcp.json`
- Restart Claude Code after config changes

### Permission Issues
- Check `allowedTools` and `disallowedTools` in settings
- Use glob patterns for flexible matching
- Bash tools can match command arguments

### Context Limits
- Use `/compact` when approaching limits
- Clear irrelevant conversation history
- Break large tasks into smaller sessions

## Resources

- [Official Documentation](https://docs.claude.com/en/docs/claude-code)
- [GitHub Repository](https://github.com/anthropics/claude-code)
- [Best Practices Guide](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Hooks Reference](https://docs.claude.com/en/docs/claude-code/hooks)
- [Plugins Documentation](https://docs.claude.com/en/docs/claude-code/plugins)

## Contributing

When contributing to this repository:
1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Use descriptive commit messages
5. Reference issues in commits when applicable

---

*This CLAUDE.md was generated to help AI assistants understand and work effectively with the Claude Code codebase.*
