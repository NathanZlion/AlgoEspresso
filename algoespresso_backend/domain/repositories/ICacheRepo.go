package repository

type SetCacheInput struct {
	Key   string
	Value interface{}
	Ttl   int
}

type ICacheRepo interface {
	SetValue(SetCacheInput) error
	GetValue(string) (interface{}, error)
	Deletevalue(string) error
}
