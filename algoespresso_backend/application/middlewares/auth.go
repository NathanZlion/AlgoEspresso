package middleware

import (
	"github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/gofiber/fiber/v2"
	"log"
	"strings"
)

func WithHeaderAuthorization(ctx *fiber.Ctx) error {
	token := defaultAuthorizationJWTExtractor(ctx)

	if token == "" {
		log.Println("WithHeaderAuthorization: Token is empty, Skipping hydration")
		return ctx.Next()
	}

	_, err := jwt.Decode(ctx.Context(), &jwt.DecodeParams{Token: token})

	if err != nil {
		log.Println("WithHeaderAuthorization: Failed to decode token, Skipping hydration")
		return ctx.Next()
	}

	claims, err := jwt.Verify(ctx.Context(), &jwt.VerifyParams{
		Token: token,
	})

	if err != nil {
		log.Println("WithHeaderAuthorization: Failed to verify claim, Skipping hydration")
		return ctx.Next()
	}

	usr, err := user.Get(ctx.Context(), claims.Subject)

	if err != nil || usr == nil {
		log.Println("User not found!")
		return ctx.Next()
	}

	ctx.Locals("user", *usr)
	log.Printf("WithHeaderAuthorization: User Data Hydrated to Context Successfully %v \n", usr.ID)

	return ctx.Next()
}

func RequireHeaderAuthorization(ctx *fiber.Ctx) error {
	user := ctx.Locals("user")
	if user == nil {
		return ctx.SendStatus(fiber.StatusUnauthorized)
	}
	return ctx.Next()

}

func AuthFailureHandler(ctx *fiber.Ctx) error {
	return ctx.SendStatus(fiber.StatusUnauthorized)
}

func defaultAuthorizationJWTExtractor(ctx *fiber.Ctx) string {
	authorization := strings.TrimSpace(ctx.Get("Authorization"))
	return strings.TrimPrefix(authorization, "Bearer ")
}
