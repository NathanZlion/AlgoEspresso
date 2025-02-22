package database

import (
	"algoespresso_backend/core"
	"go.uber.org/dig"
)

// We need the config for the connection credentials and stuff
// This works for both Cachedb and the mongodb db, can be reused.
type ConnectDbParams struct {
	dig.In
	Config core.IConfig `name:"Config"`
}
