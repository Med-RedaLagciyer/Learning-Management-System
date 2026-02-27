<?php

namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationListener
{
    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        $user = $event->getUser();

        if (!$user instanceof User) {
            return;
        }

        if (!$user->isApproved()) {
            throw new \Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException(
                $user->isRejected() 
                    ? 'Your account has been rejected. Please contact the administration.'
                    : 'Your account is pending approval.'
            );
        }
    }
}