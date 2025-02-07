package core

// core configurations will go here
type IConfig interface {
	GetEnv() Env
}

type Config struct {
	env Env
}

func (config *Config) GetEnv() Env {
	return config.env
}

func NewConfig() *Config {
	return &Config{
		env: NewEnv(),
	}
}
